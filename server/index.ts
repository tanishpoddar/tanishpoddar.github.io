import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Added static import for fs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log environment variables (excluding sensitive ones)
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SMTP_HOST: process.env.SMTP_HOST ? 'set' : 'not set',
  SMTP_PORT: process.env.SMTP_PORT ? 'set' : 'not set',
  SMTP_USER: process.env.SMTP_USER ? 'set' : 'not set',
  SMTP_PASS: process.env.SMTP_PASS ? 'set' : 'not set',
  SMTP_FROM: process.env.SMTP_FROM ? 'set' : 'not set',
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log('Starting server initialization...');
    const server = await registerRoutes(app);
    console.log('Routes registered successfully');

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        status: err.status || err.statusCode || 500
      });
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    if (process.env.NODE_ENV === "development") {
      console.log('Setting up Vite for development...');
      await setupVite(app, server);
    } else {
      console.log('Setting up static file serving for production...');
      const distPath = path.join(__dirname, '../dist/public');
      console.log('Static files path:', distPath);
      
      if (!fs.existsSync(distPath)) { // Changed from dynamic require to static import
        throw new Error(`Static files directory not found: ${distPath}`);
      }

      // Serve static files
      app.use(express.static(distPath));
      
      // Serve favicon
      app.get('/favicon.ico', (req, res) => {
        res.sendFile(path.join(distPath, 'images/favicon.png'));
      });
      
      // Handle SPA routing
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          next();
          return;
        }
        const indexPath = path.join(distPath, 'index.html');
        console.log('Serving index.html from:', indexPath);
        res.sendFile(indexPath);
      });
    }

    const port = parseInt(process.env.PORT || '5000', 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
      log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server initialization failed:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
})();

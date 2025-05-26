import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import nodemailer from "nodemailer";
import { insertMessageSchema } from "@shared/schema";
import { ZodError } from "zod";

// Debug logging for environment variables
console.log("Environment Variables Check:", {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS ? "***" : "not set",
  SMTP_FROM: process.env.SMTP_FROM
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Save message to storage
      const messageWithTimestamp = {
        ...validatedData,
        createdAt: new Date().toISOString()
      };
      
      try {
        await storage.createMessage(messageWithTimestamp);
      } catch (error) {
        console.error("Failed to save message:", error);
        return res.status(500).json({ message: "Failed to save your message." });
      }

      // Send email
      try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
          throw new Error("SMTP configuration is incomplete");
        }

        // Create reusable transporter
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          debug: true,
          logger: true
        });

        // Verify SMTP connection configuration
        console.log("Attempting SMTP connection...");
        await transporter.verify();
        console.log("SMTP connection verified successfully");

        // Send mail
        const info = await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Portfolio Contact" <noreply@example.com>',
          to: "tanishpoddar.18@gmail.com",
          subject: `Portfolio Contact: ${validatedData.subject}`,
          text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage: ${validatedData.message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
              <h3>Message:</h3>
              <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            </div>
          `,
        });
        
        console.log("Email sent successfully:", info.messageId);
        return res.status(200).json({ message: "Your message has been sent successfully!" });
      } catch (error: unknown) {
        console.error("Email error details:", {
          name: error instanceof Error ? error.name : 'Unknown error',
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        
        // Still return 200 since the message was saved
        return res.status(200).json({ 
          message: "Your message was saved but could not be emailed. I'll still receive it!"
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

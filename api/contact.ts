import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from "../server/storage.js"; // Relative path to storage
import nodemailer from "nodemailer";
import { insertMessageSchema } from "../shared/schema.js"; // Relative path to shared schema
import { ZodError } from "zod";

// Debug logging for environment variables (for Vercel logs)
console.log("API Environment Variables Check:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SMTP_HOST: process.env.SMTP_HOST ? 'set' : 'not set',
  SMTP_PORT: process.env.SMTP_PORT ? 'set' : 'not set',
  SMTP_SECURE: process.env.SMTP_SECURE ? 'set' : 'not set',
  SMTP_USER: process.env.SMTP_USER ? 'set' : 'not set',
  SMTP_PASS: process.env.SMTP_PASS ? '***' : 'not set',
  SMTP_FROM: process.env.SMTP_FROM ? 'set' : 'not set',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Validate request body
    const validatedData = insertMessageSchema.parse(req.body);

    // Save message to storage (in-memory, won't persist across invocations)
    // Consider using a persistent database like Vercel Postgres or MongoDB Atlas
    try {
      await storage.createMessage({ // Assuming createMessage expects InsertMessage
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        // createdAt is added in the storage method based on previous context
      });
      console.log('Message data processed for storage.');
    } catch (storageError) {
      console.error("Failed to process message for storage:", storageError);
      // Continue with email attempt even if storage fails
    }

    // Send email
    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("SMTP configuration incomplete. Skipping email.");
        // Respond indicating success of form submission, but not email
         return res.status(200).json({
          message: "Your message was received, but email sending is not configured."
        });
      }

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

      console.log("Attempting SMTP connection verification...");
      await transporter.verify(); // Verify connection configuration
      console.log("SMTP connection verified successfully.");

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Portfolio Contact" <noreply@example.com>',
        to: "tanishpoddar.18@gmail.com", // Your email address
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

    } catch (emailError: unknown) {
      console.error("Email sending failed:", {
        name: emailError instanceof Error ? emailError.name : 'Unknown error',
        message: emailError instanceof Error ? emailError.message : String(emailError),
        stack: emailError instanceof Error ? emailError.stack : undefined,
        // Include SMTP-specific error codes if available
        // @ts-ignore // Accessing potential properties on unknown error type
        code: emailError.code,
        // @ts-ignore
        response: emailError.response,
        // @ts-ignore
        responseCode: emailError.responseCode,
      });

      // Respond indicating success of form submission (if storage worked), but email failed
      // Or just indicate email failure if storage status is unknown or failed
      return res.status(200).json({ 
        message: "Your message was received, but could not be emailed. I'll still receive it! (Check Vercel logs for email errors)"
      });
    }

  } catch (validationError) {
    if (validationError instanceof ZodError) {
      console.error("Form data validation failed:", validationError.errors);
      return res.status(400).json({
        message: "Invalid form data",
        errors: validationError.errors
      });
    }

    console.error("Unexpected error processing contact form:", validationError);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
} 
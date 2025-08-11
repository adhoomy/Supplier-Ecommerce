// Email utility for password reset functionality
// Supports both development (Gmail SMTP) and production email services

import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter | null = null;

  private constructor() {
    this.initializeTransporter();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initializeTransporter() {
    try {
      // Priority 1: Use Gmail SMTP if credentials are available (works in both dev and production)
      if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        this.transporter = nodemailer.createTransporter({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });
        console.log("✅ Gmail SMTP transporter initialized successfully");
        return;
      }
      
      // Priority 2: Use custom SMTP if configured
      if (process.env.SMTP_HOST) {
        this.transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        console.log("✅ Custom SMTP transporter initialized successfully");
        return;
      }
      
      // Priority 3: Fallback - no transporter available
      if (process.env.NODE_ENV === "development") {
        console.log("⚠️  No email credentials found. Emails will be logged to console only.");
        console.log("   Set GMAIL_USER and GMAIL_APP_PASSWORD to enable Gmail SMTP");
        console.log("   Or set SMTP_HOST, SMTP_USER, SMTP_PASS for custom SMTP");
      } else {
        console.log("⚠️  No email credentials found. Password reset emails will not be sent.");
        console.log("   Set GMAIL_USER and GMAIL_APP_PASSWORD to enable Gmail SMTP");
        console.log("   Or set SMTP_HOST, SMTP_USER, SMTP_PASS for custom SMTP");
      }
      
    } catch (error) {
      console.error("❌ Error initializing email transporter:", error);
      this.transporter = null;
    }
  }

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<boolean> {
    try {
      const emailOptions: EmailOptions = {
        to: email,
        subject: "Password Reset Request",
        html: this.generatePasswordResetHTML(resetUrl),
        text: this.generatePasswordResetText(resetUrl),
      };

      // If we have a transporter, send the actual email
      if (this.transporter) {
        await this.transporter.sendMail({
          from: process.env.GMAIL_USER || process.env.SMTP_USER || "noreply@supplier-ecommerce.com",
          to: emailOptions.to,
          subject: emailOptions.subject,
          html: emailOptions.html,
          text: emailOptions.text,
        });
        console.log("✅ Password reset email sent successfully to:", email);
        return true;
      }

      // Fallback: log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log("=== PASSWORD RESET EMAIL (DEV MODE - NO TRANSPORTER) ===");
        console.log("To:", emailOptions.to);
        console.log("Subject:", emailOptions.subject);
        console.log("Reset URL:", resetUrl);
        console.log("=====================================");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      return false;
    }
  }

  private generatePasswordResetHTML(resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">Password Reset Request</h1>
            
            <p>You recently requested to reset your password. Click the button below to reset it:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p>If you didn't request this, you can safely ignore this email.</p>
            
            <p>This password reset link will expire in 1 hour.</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #6b7280;">
              If the button above doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
            </p>
          </div>
        </body>
      </html>
    `;
  }

  private generatePasswordResetText(resetUrl: string): string {
    return `
Password Reset Request

You recently requested to reset your password. Click the link below to reset it:

${resetUrl}

If you didn't request this, you can safely ignore this email.

This password reset link will expire in 1 hour.

If the link above doesn't work, copy and paste it into your address bar.
    `;
  }

  // Placeholder for actual email sending implementation
  // private async sendEmail(options: EmailOptions): Promise<void> {
  //   // Implementation would go here for production
  //   // Examples:
  //   // - SendGrid: https://sendgrid.com/docs/for-developers/sending-email/v3-nodejs-code-example/
  //   // - AWS SES: https://docs.aws.amazon.com/ses/latest/dg/send-email-raw.html
  //   // - Nodemailer: https://nodemailer.com/
  //   throw new Error("Email sending not implemented");
  // }
}

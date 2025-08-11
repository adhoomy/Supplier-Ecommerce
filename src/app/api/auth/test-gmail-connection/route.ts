import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    console.log("🧪 Testing Gmail SMTP connection...");
    
    // Check if credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json({
        success: false,
        error: "Gmail credentials not configured",
        hasGmailUser: !!process.env.GMAIL_USER,
        hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
      });
    }
    
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    
    console.log("✅ Transporter created, testing connection...");
    
    // Test the connection
    await transporter.verify();
    
    console.log("✅ Gmail SMTP connection successful!");
    
    return NextResponse.json({
      success: true,
      message: "Gmail SMTP connection successful",
      gmailUser: process.env.GMAIL_USER,
      connectionTested: true
    });
    
  } catch (error) {
    console.error("❌ Gmail SMTP connection failed:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      gmailUser: process.env.GMAIL_USER,
      connectionTested: false
    }, { status: 500 });
  }
}

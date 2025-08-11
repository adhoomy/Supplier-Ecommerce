import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email";

export async function GET() {
  try {
    console.log("🧪 Testing email service...");
    
    // Log all environment variables for debugging
    console.log("Environment variables:");
    console.log("- NODE_ENV:", process.env.NODE_ENV);
    console.log("- GMAIL_USER:", process.env.GMAIL_USER ? "SET" : "NOT SET");
    console.log("- GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "SET (" + process.env.GMAIL_APP_PASSWORD.length + " chars)" : "NOT SET");
    
    // Test email service initialization
    const emailService = EmailService.getInstance();
    
    // Test sending a simple email
    const testResult = await emailService.sendPasswordResetEmail(
      "test@example.com", 
      "http://localhost:3001/auth/reset-password?token=test123"
    );
    
    return NextResponse.json({
      success: true,
      emailServiceWorking: testResult,
      environment: process.env.NODE_ENV,
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      gmailPasswordLength: process.env.GMAIL_APP_PASSWORD?.length || 0,
      message: "Email service test completed"
    });
    
  } catch (error) {
    console.error("❌ Email service test failed:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      environment: process.env.NODE_ENV,
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      gmailPasswordLength: process.env.GMAIL_APP_PASSWORD?.length || 0
    }, { status: 500 });
  }
}

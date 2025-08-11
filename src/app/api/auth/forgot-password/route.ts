import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { EmailService } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();

    // Check if user exists
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      await client.close();
      return NextResponse.json(
        { message: "If an account with that email exists, a password reset link has been sent." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      }
    );

    await client.close();

    // Generate reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3001"}/auth/reset-password?token=${resetToken}`;
    
    // Send password reset email
    try {
      const emailService = EmailService.getInstance();
      const emailSent = await emailService.sendPasswordResetEmail(user.email, resetUrl);
      
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json(
          { 
            message: "Password reset link generated successfully",
            resetUrl, // Only in development
            note: "In production, this would be sent via email"
          },
          { status: 200 }
        );
      }

      if (emailSent) {
        return NextResponse.json(
          { message: "If an account with that email exists, a password reset link has been sent." },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to send password reset email. Please try again." },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error("Email service error:", emailError);
      
      // In development, still return the reset URL even if email fails
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json(
          { 
            message: "Password reset link generated successfully (email failed)",
            resetUrl,
            note: "Email service error occurred, but reset link is available"
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to send password reset email. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

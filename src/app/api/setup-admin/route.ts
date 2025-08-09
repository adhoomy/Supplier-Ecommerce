import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

// Password validation function
function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)");
  }
  
  // Check for common weak patterns
  const weakPatterns = [
    'password', '123456', 'qwerty', 'abc123', 'password123',
    'admin', 'user', 'test', 'guest', 'welcome'
  ];
  
  const lowerPassword = password.toLowerCase();
  if (weakPatterns.some(pattern => lowerPassword.includes(pattern))) {
    errors.push("Password contains common weak patterns");
  }
  
  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    errors.push("Password cannot contain more than 2 repeated characters in a row");
  }
  
  // Check for sequential characters
  if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
    errors.push("Password cannot contain sequential characters (abc, 123, etc.)");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          message: "Password does not meet security requirements",
          passwordErrors: passwordValidation.errors
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db();

    // Check if any admin users already exist
    const existingAdmin = await db.collection("users").findOne({ role: "admin" });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin setup is disabled. Admin users already exist in the system." },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create initial admin user (only when no admins exist)
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      isInitialAdmin: true, // Mark as the initial admin
    });

    return NextResponse.json(
      {
        message: "Initial admin user created successfully! You can now login with this account.",
        user: {
          id: result.insertedId.toString(),
          name,
          email,
          role: "admin",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Setup admin error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 
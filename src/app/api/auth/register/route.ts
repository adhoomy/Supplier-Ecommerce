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

    // Create user (always as regular user, never admin)
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user", // Always create as regular user
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: result.insertedId.toString(),
          name,
          email,
          role: "user",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 
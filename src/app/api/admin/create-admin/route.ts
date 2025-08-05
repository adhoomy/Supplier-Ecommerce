import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

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

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
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

    // Create admin user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Admin user created successfully",
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
    console.error("Admin creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 
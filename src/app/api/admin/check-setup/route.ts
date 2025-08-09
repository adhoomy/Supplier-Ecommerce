import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db();

    // Check if any admin users exist
    const existingAdmin = await db.collection("users").findOne({ role: "admin" });
    
    return NextResponse.json({
      needsSetup: !existingAdmin,
      message: existingAdmin 
        ? "Admin accounts already exist" 
        : "No admin accounts found, setup required"
    });
  } catch (error) {
    console.error("Check setup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

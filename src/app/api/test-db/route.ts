import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Check if MONGODB_URI is set
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return NextResponse.json(
        { 
          error: 'MONGODB_URI not set',
          message: 'Please set the MONGODB_URI environment variable in Vercel'
        },
        { status: 500 }
      );
    }

    // Try to connect to MongoDB
    await connectDB();
    const db = mongoose.connection.db;
    
    // Try to get collection info
    const collections = await db.listCollections().toArray();
    
    // Try to count products
    const productCount = await db.collection('products').countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      collections: collections.map(col => col.name),
      productCount,
      mongoUri: mongoUri.substring(0, 20) + '...' // Only show first 20 chars for security
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set'
      },
      { status: 500 }
    );
  }
} 
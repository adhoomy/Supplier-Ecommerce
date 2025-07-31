import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB Atlas connected successfully!' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to MongoDB Atlas',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
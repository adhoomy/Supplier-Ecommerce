import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

// GET single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const product = await Product.findById(params.id).lean();
    
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT update product by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const product = await Product.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).lean();
    
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE product by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const product = await Product.findByIdAndDelete(params.id).lean();
    
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to delete product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

// GET all products with filtering, pagination, search, and sorting
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const inStock = searchParams.get('inStock') || '';
    
    // Build filter object
    const filter: any = { isActive: true };
    
    // Category filter
    if (category) {
      filter.category = category;
    }
    
    // Price range filter
    if (minPrice > 0 || maxPrice < 999999) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    
    // Stock filter
    if (inStock === 'true') {
      filter.stock = { $gt: 0 };
    } else if (inStock === 'false') {
      filter.stock = 0;
    }
    
    // Search filter (search in name and description)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return NextResponse.json({ 
      success: true, 
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage,
        hasPrevPage,
        limit
      },
      filters: {
        search,
        category,
        minPrice,
        maxPrice,
        inStock,
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const product = await Product.create(body);
    
    return NextResponse.json({ 
      success: true, 
      data: product,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
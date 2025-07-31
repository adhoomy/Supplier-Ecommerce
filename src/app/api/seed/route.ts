import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

const dummyProducts = [
  {
    name: "Heavy Duty Garbage Bags 55 Gallon",
    description: "Commercial grade garbage bags, 55 gallon capacity, 3 mil thickness. Perfect for restaurants, offices, and commercial use. Pack of 50 bags.",
    price: 24.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 100,
    isActive: true
  },
  {
    name: "Aluminum Foil Roll Commercial",
    description: "Heavy-duty aluminum foil roll, 18 inches wide, 1000 feet long. Ideal for food service, catering, and commercial kitchens.",
    price: 34.99,
    category: "packaging",
    images: [
      "https://images.unsplash.com/photo-1515668236457-83c3b8764839?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
    ],
    stock: 75,
    isActive: true
  },
  {
    name: "Disposable Food Trays 9x13",
    description: "Disposable aluminum food trays, 9x13 inches, pack of 50. Perfect for catering, food service, and takeout operations.",
    price: 19.99,
    category: "packaging",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515668236457-83c3b8764839?w=500&h=500&fit=crop"
    ],
    stock: 200,
    isActive: true
  },
  {
    name: "Commercial Paper Towels",
    description: "Bulk paper towels, 2-ply, 12 rolls per case. High absorbency for commercial kitchens and cleaning applications.",
    price: 29.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 50,
    isActive: true
  },
  {
    name: "Plastic Wrap Commercial",
    description: "Heavy-duty plastic wrap, 18 inches wide, 2000 feet per roll. Stretchable cling film for food storage and packaging.",
    price: 22.99,
    category: "packaging",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515668236457-83c3b8764839?w=500&h=500&fit=crop"
    ],
    stock: 60,
    isActive: true
  },
  {
    name: "Disposable Gloves Latex Free",
    description: "Powder-free disposable gloves, large size, box of 100. Food-safe for restaurant and commercial use.",
    price: 15.99,
    category: "safety",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 150,
    isActive: true
  },
  {
    name: "Commercial Dish Soap",
    description: "Concentrated dish soap, 1-gallon bottle. Heavy-duty degreaser for commercial dishwashing and cleaning.",
    price: 12.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 80,
    isActive: true
  },
  {
    name: "Food Storage Containers Set",
    description: "Set of 10 clear plastic food storage containers with lids. Various sizes for restaurant prep and storage.",
    price: 39.99,
    category: "storage",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515668236457-83c3b8764839?w=500&h=500&fit=crop"
    ],
    stock: 25,
    isActive: true
  },
  {
    name: "Commercial Floor Cleaner",
    description: "Concentrated floor cleaner, 1-gallon bottle. Safe for all floor types, removes grease and grime.",
    price: 18.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 45,
    isActive: true
  },
  {
    name: "Disposable Cups 16oz",
    description: "Hot and cold beverage cups, 16oz capacity, pack of 100. Perfect for restaurants and coffee shops.",
    price: 16.99,
    category: "packaging",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515668236457-83c3b8764839?w=500&h=500&fit=crop"
    ],
    stock: 300,
    isActive: true
  },
  {
    name: "Safety Goggles Clear",
    description: "Clear safety goggles with anti-fog coating. Essential for kitchen staff and cleaning personnel.",
    price: 8.99,
    category: "safety",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 120,
    isActive: true
  },
  {
    name: "Commercial Hand Soap",
    description: "Antibacterial hand soap, 1-gallon refill bottle. Gentle on hands, effective against germs.",
    price: 14.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 65,
    isActive: true
  },
  {
    name: "Parchment Paper Sheets",
    description: "Pre-cut parchment paper sheets, 12x16 inches, pack of 500. Non-stick baking and food prep.",
    price: 21.99,
    category: "packaging",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515668236457-83c3b8764839?w=500&h=500&fit=crop"
    ],
    stock: 90,
    isActive: true
  },
  {
    name: "Commercial Trash Cans",
    description: "Heavy-duty stainless steel trash cans, 32-gallon capacity. Perfect for commercial kitchens and restaurants.",
    price: 89.99,
    category: "equipment",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 15,
    isActive: true
  },
  {
    name: "Disposable Aprons",
    description: "Disposable polypropylene aprons, pack of 100. Lightweight protection for food service and cleaning.",
    price: 19.99,
    category: "safety",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 200,
    isActive: true
  },
  {
    name: "Commercial Degreaser",
    description: "Heavy-duty degreaser, 1-gallon bottle. Removes grease, oil, and grime from surfaces and equipment.",
    price: 16.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 55,
    isActive: true
  },
  {
    name: "Food Prep Cutting Boards",
    description: "Set of 3 color-coded cutting boards. HACCP compliant for safe food preparation in commercial kitchens.",
    price: 34.99,
    category: "equipment",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 30,
    isActive: true
  },
  {
    name: "Disposable Face Masks",
    description: "3-ply disposable face masks, box of 50. Essential for food service and commercial environments.",
    price: 12.99,
    category: "safety",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 250,
    isActive: true
  },
  {
    name: "Commercial Sanitizer",
    description: "Food-safe sanitizer concentrate, 1-gallon bottle. Kills 99.9% of bacteria and viruses.",
    price: 24.99,
    category: "cleaning",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 40,
    isActive: true
  },
  {
    name: "Storage Shelving Unit",
    description: "Heavy-duty wire shelving unit, 48x18x72 inches. Adjustable shelves for commercial storage.",
    price: 129.99,
    category: "equipment",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    ],
    stock: 8,
    isActive: true
  }
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts > 0) {
      return NextResponse.json({
        success: false,
        message: 'Database already contains products. Use DELETE method to clear before seeding.',
        existingCount: existingProducts
      }, { status: 400 });
    }
    
    // Insert dummy products
    const insertedProducts = await Product.insertMany(dummyProducts);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded database with ${insertedProducts.length} products`,
      count: insertedProducts.length,
      categories: {
        cleaning: dummyProducts.filter(p => p.category === 'cleaning').length,
        packaging: dummyProducts.filter(p => p.category === 'packaging').length,
        safety: dummyProducts.filter(p => p.category === 'safety').length,
        storage: dummyProducts.filter(p => p.category === 'storage').length,
        equipment: dummyProducts.filter(p => p.category === 'equipment').length
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to seed database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectDB();
    
    // Delete all products
    const result = await Product.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} products from database`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error clearing database:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to clear database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const totalProducts = await Product.countDocuments();
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      totalProducts,
      categories,
      message: 'Database status retrieved successfully'
    });
    
  } catch (error) {
    console.error('Error getting database status:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to get database status',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    await connectDB();
    
    const product = await Product.findById(id).lean();
    
    if (!product) {
      console.log('Product not found in database:', id);
      return null;
    }
    
    console.log('Product found:', product.name);
    return product;
  } catch (error) {
    console.error('Error fetching product from database:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      cleaning: 'bg-blue-100 text-blue-800',
      packaging: 'bg-green-100 text-green-800',
      safety: 'bg-red-100 text-red-800',
      storage: 'bg-purple-100 text-purple-800',
      equipment: 'bg-orange-100 text-orange-800',
      electronics: 'bg-indigo-100 text-indigo-800',
      clothing: 'bg-pink-100 text-pink-800',
      books: 'bg-yellow-100 text-yellow-800',
      home: 'bg-teal-100 text-teal-800',
      sports: 'bg-cyan-100 text-cyan-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900">
                SupplierHub
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Product Section - Gumroad Style */}
      <section className="relative py-8 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* Product Image */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative aspect-square bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-2xl">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Additional Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info - Gumroad Style */}
            <div className="space-y-6 sm:space-y-8">
              {/* Category Badge */}
              <div>
                <span className={`inline-flex px-3 sm:px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                  {getCategoryLabel(product.category)}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                {product.description}
              </p>

              {/* Price and Stock */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-baseline space-x-3 sm:space-x-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.stock > 0 && (
                    <span className="text-lg sm:text-xl text-green-600 font-semibold">
                      Available
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-base sm:text-lg font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Action Buttons - Gumroad Style */}
              <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    className={`flex-1 py-4 sm:py-6 px-6 sm:px-8 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                      product.stock > 0
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="flex-1 py-4 sm:py-6 px-6 sm:px-8 border-2 border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
                    Buy Now
                  </button>
                </div>
                
                <button className="w-full py-3 sm:py-4 px-6 sm:px-8 border border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl text-base sm:text-lg font-medium hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Trust Indicators - Gumroad Style */}
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Quality Assured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Product Details
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Everything you need to know about this product
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Category</h3>
                <p className="text-gray-600">{getCategoryLabel(product.category)}</p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">SKU</h3>
                <p className="text-gray-600 font-mono text-sm">{product._id}</p>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Status</h3>
                <p className="text-gray-600">
                  {product.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Added</h3>
                <p className="text-gray-600">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Related Products
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover more products you might like
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* This would be populated with related products */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 text-center shadow-lg">
              <p className="text-gray-500 text-sm sm:text-base">Related products will appear here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
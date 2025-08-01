'use client';

import { useProduct } from '@/hooks/useProduct';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { product, loading, error, refetch } = useProduct(productId);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Error Loading Product</h1>
            <p className="text-gray-600 mb-8">
              {error || 'Failed to load product details. Please try again.'}
            </p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={refetch}
              className="block w-full bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/products" 
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden">
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
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
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

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
              {getCategoryLabel(product.category)}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.stock > 0 && (
              <span className="text-lg text-green-600 font-medium">
                Available
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <p className="font-medium text-gray-900">{getCategoryLabel(product.category)}</p>
              </div>
              <div>
                <span className="text-gray-500">SKU:</span>
                <p className="font-medium text-gray-900">{product._id}</p>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <p className="font-medium text-gray-900">
                  {product.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Added:</span>
                <p className="font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-6">
            <div className="flex space-x-4">
              <button 
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  product.stock > 0
                    ? 'bg-black text-white hover:bg-gray-800 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200">
                Buy Now
              </button>
            </div>
            
            <button className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Add to Wishlist
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center space-y-1">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import Link from 'next/link';
import ProductsSection from '@/components/product/ProductsSection';
import Header from '@/components/layout/Header';

export default function ProductsPage() {
  return (
         <div className="min-h-screen bg-gray-50">
       <Header />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of high-quality supplies for your business needs
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsSection limit={20} />
      </div>
    </div>
  );
} 
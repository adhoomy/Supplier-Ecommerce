import Link from 'next/link';
import CartIcon from '@/components/cart/CartIcon';

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
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
               <CartIcon />
               <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                 Sign In
               </Link>
               <Link 
                 href="/register" 
                 className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
               >
                 Get Started
               </Link>
             </div>
        </div>
      </div>
    </header>
  );
} 
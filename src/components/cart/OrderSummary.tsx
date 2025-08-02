'use client';

import Link from 'next/link';

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  onClearCart: () => void;
  variant?: 'sidebar' | 'page';
}

export default function OrderSummary({ totalItems, totalPrice, onClearCart, variant = 'page' }: OrderSummaryProps) {
  const isSidebar = variant === 'sidebar';
  
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${isSidebar ? 'p-6' : 'p-6 sticky top-24'}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/checkout"
          className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center block"
        >
          Proceed to Checkout
        </Link>
        {!isSidebar && (
          <Link
            href="/cart"
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
          >
            View Full Cart
          </Link>
        )}
        <button
          onClick={onClearCart}
          className={`w-full text-gray-600 hover:text-gray-800 text-sm font-medium ${isSidebar ? '' : 'py-2'}`}
        >
          Clear Cart
        </button>
      </div>

      {!isSidebar && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Free Shipping</h3>
          <p className="text-sm text-blue-700">
            Orders over $50 qualify for free shipping. Your order is eligible!
          </p>
        </div>
      )}
    </div>
  );
} 
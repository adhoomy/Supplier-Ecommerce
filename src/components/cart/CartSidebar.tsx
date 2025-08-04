'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { X } from 'lucide-react';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

export default function CartSidebar() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-20 z-40"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start shopping to add items to your cart.
                </p>
                                 <div className="mt-6 space-y-3">
                   <Link
                     href="/products"
                     onClick={closeCart}
                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                   >
                     Browse Products
                   </Link>
                   <Link
                     href="/cart"
                     onClick={closeCart}
                     className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                   >
                     View Full Cart
                   </Link>
                 </div>
              </div>
            ) : (
                             <div className="space-y-4">
                 {items.map((item) => (
                   <CartItem
                     key={item.id}
                     item={item}
                     onQuantityChange={handleQuantityChange}
                     onRemove={removeItem}
                     variant="sidebar"
                   />
                 ))}
               </div>
            )}
          </div>

                     {/* Footer */}
           {items.length > 0 && (
             <div className="border-t border-gray-200 p-6 space-y-4">
               <OrderSummary
                 totalItems={totalItems}
                 totalPrice={totalPrice}
                 onClearCart={clearCart}
                 variant="sidebar"
               />
             </div>
           )}
        </div>
      </div>
    </>
  );
} 
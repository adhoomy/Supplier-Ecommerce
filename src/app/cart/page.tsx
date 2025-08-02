'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import CartItem from '@/components/cart/CartItem';
import OrderSummary from '@/components/cart/OrderSummary';

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
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

  return (
         <div className="min-h-screen bg-gray-50">
       <Header />

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems > 0 
              ? `${totalItems} item${totalItems === 1 ? '' : 's'} in your cart`
              : 'Your cart is empty'
            }
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to add some great products!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Cart Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                </div>
                                 <div className="divide-y divide-gray-200">
                   {items.map((item) => (
                     <CartItem
                       key={item.id}
                       item={item}
                       onQuantityChange={handleQuantityChange}
                       onRemove={removeItem}
                       variant="page"
                     />
                   ))}
                 </div>
              </div>
            </div>

                         {/* Order Summary */}
             <div className="lg:col-span-1">
               <OrderSummary
                 totalItems={totalItems}
                 totalPrice={totalPrice}
                 onClearCart={clearCart}
                 variant="page"
               />
             </div>
          </div>
        )}
      </div>
    </div>
  );
} 
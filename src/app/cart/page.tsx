'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import CartItem from '@/components/cart/CartItem';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyState from '@/components/ui/EmptyState';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems > 0 
              ? `${totalItems} item${totalItems === 1 ? '' : 's'} in your cart`
              : 'Your cart is empty'
            }
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12">
            <EmptyState
              title="Your cart is empty"
              description="Looks like you haven't added any items to your cart yet. Start shopping to add some great products!"
              icon={<ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16" />}
              actionText="Browse Products"
              actionHref="/products"
            />
          </div>
        ) : (
          /* Cart Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200">
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
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserState } from "@/hooks/useUserState";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";

export default function CheckoutPage() {
  const { isAuthenticated, user, status } = useAuth();
  const { userProfile, isCustomer } = useUserState();
  const { items, totalItems, totalPrice, closeCart, clearCart } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (!isAuthenticated) {
      router.push("/auth/login?callbackUrl=/checkout");
    }
    
    // Close cart when entering checkout
    closeCart();
  }, [isAuthenticated, status, router, closeCart]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push("/orders");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform cart items to order items format
      const orderItems = items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const orderData = {
        items: orderItems,
        total: totalPrice * 1.08, // Include 8% tax
        shippingAddress: formData
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create order: ${errorData.error || 'Unknown error'}`);
      }

      // Clear cart first, then redirect
      clearCart();
      
      // Force a small delay to ensure cart is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to orders page with success parameter
      router.push("/orders?from=checkout");
    } catch (error) {
      console.error('Error placing order:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">
              Welcome, {user?.name}! Complete your order below.
              {isCustomer() && <span className="ml-2 text-blue-600">(Customer Account)</span>}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-600">IMG</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">${(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

                         {/* Checkout Form */}
             <div>
               <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
               <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                                         <input
                       type="text"
                       name="firstName"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="John"
                       value={formData.firstName}
                       onChange={handleInputChange}
                       required
                     />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                                         <input
                       type="text"
                       name="lastName"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Doe"
                       value={formData.lastName}
                       onChange={handleInputChange}
                       required
                     />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                                     <input
                     type="email"
                     name="email"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="john@example.com"
                     value={formData.email}
                     onChange={handleInputChange}
                     required
                   />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                                     <input
                     type="text"
                     name="address"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="123 Main St"
                     value={formData.address}
                     onChange={handleInputChange}
                     required
                   />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                                         <input
                       type="text"
                       name="city"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="New York"
                       value={formData.city}
                       onChange={handleInputChange}
                       required
                     />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                                         <input
                       type="text"
                       name="state"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="NY"
                       value={formData.state}
                       onChange={handleInputChange}
                       required
                     />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP
                    </label>
                                         <input
                       type="text"
                       name="zipCode"
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="10001"
                       value={formData.zipCode}
                       onChange={handleInputChange}
                       required
                     />
                  </div>
                </div>

                                 <div className="pt-6">
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? "Processing Order..." : "Complete Order"}
                   </button>
                 </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
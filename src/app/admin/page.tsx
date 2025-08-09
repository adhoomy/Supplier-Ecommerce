"use client";

import { useState } from "react";
import UserManagement from "@/components/admin/UserManagement";
import ProductManagement from "@/components/admin/ProductManagement";
import OrderManagement from "@/components/admin/OrderManagement";
import DatabaseManagement from "@/components/admin/DatabaseManagement";
import AdminProtected from "@/components/admin/AdminProtected";
import { useAuth } from "@/hooks/useAuth";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { session } = useAuth();

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-6">
            <nav className="flex flex-wrap space-x-4 sm:space-x-8">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "dashboard"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Product Management
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Order Management
              </button>
              <a
                href="/admin/create"
                className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Create Admin
              </a>
              <button
                onClick={() => setActiveTab("database")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "database"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Database
              </button>
            </nav>
          </div>

          {activeTab === "dashboard" && (
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-4 sm:px-6 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Admin Dashboard
                </h1>
            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* User Management Card */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">
                      User Management
                    </h3>
                    <p className="text-blue-700 mb-4 text-sm sm:text-base">
                      Manage user accounts, roles, and permissions
                    </p>
                    <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
                      Manage Users
                    </button>
                  </div>

                  {/* Product Management Card */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-3 sm:mb-4">
                      Product Management
                    </h3>
                    <p className="text-green-700 mb-4 text-sm sm:text-base">
                      Add, edit, and manage product inventory
                    </p>
                    <button 
                      onClick={() => setActiveTab("products")}
                      className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
                    >
                      Manage Products
                    </button>
                  </div>

                  {/* Order Management Card */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-3 sm:mb-4">
                      Order Management
                    </h3>
                    <p className="text-purple-700 mb-4 text-sm sm:text-base">
                      View and manage customer orders
                    </p>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm sm:text-base"
                    >
                      View Orders
                    </button>
                  </div>

                  {/* Analytics Card */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-orange-900 mb-3 sm:mb-4">
                      Analytics
                    </h3>
                    <p className="text-orange-700 mb-4 text-sm sm:text-base">
                      View sales reports and analytics
                    </p>
                    <button className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm sm:text-base">
                      View Analytics
                    </button>
                  </div>

                  {/* Settings Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      Settings
                    </h3>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base">
                      Configure system settings and preferences
                    </p>
                    <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base">
                      Settings
                    </button>
                  </div>

                  {/* System Status Card */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-red-900 mb-3 sm:mb-4">
                      System Status
                    </h3>
                    <p className="text-red-700 mb-4 text-sm sm:text-base">
                      Monitor system health and performance
                    </p>
                    <button className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base">
                      System Status
                    </button>
                  </div>

                  {/* Database Management Card */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-indigo-900 mb-3 sm:mb-4">
                      Database Management
                    </h3>
                    <p className="text-indigo-700 mb-4 text-sm sm:text-base">
                      Manage database seeding and clearing operations
                    </p>
                    <button 
                      onClick={() => setActiveTab("database")}
                      className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                    >
                      Database
                    </button>
                  </div>
                </div>

                {/* Admin Info */}
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Admin Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Name</p>
                      <p className="font-medium text-sm sm:text-base">{session?.user?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Email</p>
                      <p className="font-medium text-sm sm:text-base">{session?.user?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Role</p>
                      <p className="font-medium text-sm sm:text-base capitalize">{session?.user?.role}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">User ID</p>
                      <p className="font-medium text-xs sm:text-sm">{session?.user?.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <UserManagement />
          )}

          {activeTab === "products" && (
            <ProductManagement />
          )}

          {activeTab === "orders" && (
            <OrderManagement />
          )}

          {activeTab === "database" && (
            <DatabaseManagement />
          )}
        </div>
      </div>
    </AdminProtected>
  );
} 
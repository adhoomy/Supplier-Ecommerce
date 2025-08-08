"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserState } from "@/hooks/useUserState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const { isAuthenticated, user, status } = useAuth();
  const { userProfile } = useUserState();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!isAuthenticated) {
      router.push("/auth/login?callbackUrl=/profile");
      return;
    }
  }, [isAuthenticated, status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{userProfile?.email || user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <p className="text-gray-900 capitalize">{userProfile?.role || user?.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <p className="text-gray-900 text-sm">{userProfile?.id || user?.id}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Edit Profile</div>
                  <div className="text-sm text-gray-600">Update your personal information</div>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Change Password</div>
                  <div className="text-sm text-gray-600">Update your account password</div>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Notification Settings</div>
                  <div className="text-sm text-gray-600">Manage your email preferences</div>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Billing Information</div>
                  <div className="text-sm text-gray-600">Update payment methods</div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-900">0</div>
                <div className="text-sm text-blue-700">Total Orders</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-900">$0.00</div>
                <div className="text-sm text-green-700">Total Spent</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-900">0</div>
                <div className="text-sm text-purple-700">Wishlist Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

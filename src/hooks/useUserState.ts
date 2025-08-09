"use client";

import { useAuth } from "./useAuth";
import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add more user fields as needed
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export function useUserState() {
  const { session, isAuthenticated, status } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update user profile when session changes
  useEffect(() => {
    if (session?.user) {
      setUserProfile({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      });
    } else {
      setUserProfile(null);
    }
  }, [session]);

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      // Here you would typically make an API call to update user profile
      // For now, we'll just update the local state
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      
      // Update user profile in database (implement when needed)
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error: 'Failed to update profile' };
    } finally {
      setIsLoading(false);
    }
  };

  const getUserRole = () => {
    return userProfile?.role || 'user';
  };

  const isAdmin = () => {
    return getUserRole() === 'admin';
  };

  const isSupplier = () => {
    return getUserRole() === 'supplier';
  };

  const isCustomer = () => {
    return getUserRole() === 'user';
  };

  return {
    userProfile,
    isAuthenticated,
    isLoading,
    status,
    updateUserProfile,
    getUserRole,
    isAdmin,
    isSupplier,
    isCustomer,
  };
} 
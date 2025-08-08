"use client";

import Link from 'next/link';
import CartIcon from '@/components/cart/CartIcon';
import { useAuth } from '@/hooks/useAuth';
import { useUserState } from '@/hooks/useUserState';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { userProfile, getUserRole, isAdmin, isSupplier, isCustomer } = useUserState();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, []);

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900">
              SupplierHub
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop User Menu & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <CartIcon />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span className="hidden sm:inline">Welcome, {user?.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {getUserRole()}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        {userProfile?.email}
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      {isAdmin() && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartIcon />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/products" 
                  className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/about" 
                  className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {getUserRole()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Link 
                        href="/profile" 
                        className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/orders" 
                        className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        My Orders
                      </Link>
                      {isAdmin() && (
                        <Link 
                          href="/admin" 
                          className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setShowMobileMenu(false);
                        }}
                        className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      href="/auth/login" 
                      className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 
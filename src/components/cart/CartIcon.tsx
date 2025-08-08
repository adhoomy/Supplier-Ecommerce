'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartIcon() {
  const { totalItems } = useCartStore();

  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      aria-label="Shopping cart"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium z-10">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
} 
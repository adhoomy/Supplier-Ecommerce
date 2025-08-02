'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  variant?: 'sidebar' | 'page';
}

export default function CartItem({ item, onQuantityChange, onRemove, variant = 'page' }: CartItemProps) {
  const isSidebar = variant === 'sidebar';
  
  return (
    <div className={`flex items-center space-x-4 ${isSidebar ? 'p-4 border border-gray-200 rounded-lg' : 'p-6'}`}>
      <img
        src={item.image}
        alt={item.name}
        className={`${isSidebar ? 'w-16 h-16' : 'w-20 h-20'} object-cover rounded-lg`}
      />
      <div className="flex-1 min-w-0">
        <h3 className={`${isSidebar ? 'text-sm' : 'text-lg'} font-medium text-gray-900 truncate`}>
          {item.name}
        </h3>
        {!isSidebar && (
          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
        )}
        <p className={`${isSidebar ? 'text-sm' : 'text-lg font-semibold'} text-gray-900 ${!isSidebar ? 'mt-1' : ''}`}>
          ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className={`${isSidebar ? 'p-1' : 'p-2'} text-gray-600 hover:text-gray-900 disabled:opacity-50`}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className={`${isSidebar ? 'w-8' : 'px-4 py-2 min-w-[3rem]'} text-sm font-medium text-gray-900 text-center`}>
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className={`${isSidebar ? 'p-1' : 'p-2'} text-gray-600 hover:text-gray-900 disabled:opacity-50`}
            disabled={item.quantity >= item.stock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className={`${isSidebar ? 'p-1' : 'p-2'} text-red-500 hover:text-red-700 transition-colors`}
        >
          <Trash2 className={`${isSidebar ? 'w-4 h-4' : 'w-5 h-5'}`} />
        </button>
      </div>
      {!isSidebar && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>Stock: {item.stock} available</span>
          <span className="font-medium">
            Total: ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
} 
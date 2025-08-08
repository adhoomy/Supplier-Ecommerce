'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/types/cart';

export const useAddToCart = () => {
  const { addItem } = useCartStore();

  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  }) => {
    addItem(product);
  };

  return { addToCart };
}; 
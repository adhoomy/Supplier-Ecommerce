'use client';

import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/types/cart';

export const useAddToCart = () => {
  const { addItem, openCart } = useCartStore();

  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  }) => {
    addItem(product);
    // Optionally open the cart when an item is added
    // openCart();
  };

  return { addToCart };
}; 
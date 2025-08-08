import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, CartItem } from '@/types/cart';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Actions
      addItem: (item: Omit<CartItem, 'quantity'>) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            // Update quantity if item already exists
            const updatedItems = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                : i
            );
            
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            
            return {
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          } else {
            // Add new item
            const newItem: CartItem = { ...item, quantity: 1 };
            const updatedItems = [...state.items, newItem];
            
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            
            return {
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          }
        });
      },

      removeItem: (id: string) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
          
          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) }
              : item
          ).filter((item) => item.quantity > 0); // Remove items with 0 quantity
          
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
          
          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
); 
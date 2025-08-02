# Cart Implementation with Zustand

This project implements a global cart state using Zustand, a lightweight state management solution for React.

## Features

- ✅ Global cart state management
- ✅ Persistent cart data (localStorage)
- ✅ Add/remove items
- ✅ Update quantities
- ✅ Cart sidebar with full functionality
- ✅ Cart icon with item count
- ✅ Stock validation
- ✅ Responsive design

## Architecture

### Store Structure
- **Location**: `src/store/cartStore.ts`
- **Type definitions**: `src/types/cart.ts`
- **Persistence**: Uses Zustand's persist middleware with localStorage

### Components
- **CartIcon**: `src/components/cart/CartIcon.tsx` - Header cart icon with count
- **CartSidebar**: `src/components/cart/CartSidebar.tsx` - Full cart interface
- **CartProvider**: `src/components/cart/CartProvider.tsx` - App wrapper

### Hooks
- **useAddToCart**: `src/hooks/useAddToCart.ts` - Convenient hook for adding items

## Usage

### Adding Items to Cart
```tsx
import { useAddToCart } from '@/hooks/useAddToCart';

const { addToCart } = useAddToCart();

// In your component
<button onClick={() => addToCart({
  id: product._id,
  name: product.name,
  price: product.price,
  image: product.images[0],
  category: product.category,
  stock: product.stock,
})}>
  Add to Cart
</button>
```

### Accessing Cart State
```tsx
import { useCartStore } from '@/store/cartStore';

const { items, totalItems, totalPrice, isOpen } = useCartStore();
```

### Cart Actions
```tsx
const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart 
} = useCartStore();
```

## Cart State Structure

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}
```

## Features

### 1. Persistent Storage
- Cart data persists across browser sessions
- Uses localStorage with Zustand persist middleware
- Only stores essential data (items, totals)

### 2. Stock Validation
- Prevents adding more items than available stock
- Disables buttons when stock is 0
- Shows "Out of Stock" for unavailable items

### 3. Quantity Management
- Increment/decrement quantities
- Remove items when quantity reaches 0
- Respects stock limits

### 4. Cart Sidebar
- Slide-in cart interface
- Full item management
- Checkout integration
- Empty cart state

### 5. Cart Icon
- Shows item count badge
- Opens cart sidebar on click
- Responsive design

## Testing

Visit `/cart-demo` to test the cart functionality with demo products.

## Integration Points

### Product Cards
- Updated `ProductCard.tsx` to include "Add to Cart" functionality
- Stock-aware button states
- Proper product data mapping

### Layout Integration
- CartProvider wraps the entire app in `layout.tsx`
- CartIcon added to header components
- CartSidebar renders globally

## Dependencies

- `zustand`: State management
- `lucide-react`: Icons
- `next/link`: Navigation

## Future Enhancements

- [ ] Cart animations
- [ ] Bulk operations
- [ ] Save for later functionality
- [ ] Cart sharing
- [ ] Advanced filtering
- [ ] Cart analytics 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    size?: string;
  }) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      addItem: (product) => {
        const items = get().items;
        // Check for same product AND size (if size is specified)
        const existingItem = items.find((item) => 
          item.id === product.id && item.size === product.size
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.size === product.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            isCartOpen: true, // Open cart when adding item
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            isCartOpen: true, // Open cart when adding item
          });
        }
      },
      removeItem: (id, size) => {
        set({
          items: get().items.filter((item) => 
            !(item.id === id && item.size === size)
          ),
        });
      },
      updateQuantity: (id, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // Don't persist UI state like isCartOpen
    }
  )
);


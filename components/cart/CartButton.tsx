'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function CartButton() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-black hover:text-red transition-colors"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-heading font-bold">
          {itemCount}
        </span>
      )}
    </button>
  );
}


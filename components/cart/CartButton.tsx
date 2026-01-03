'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function CartButton() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}


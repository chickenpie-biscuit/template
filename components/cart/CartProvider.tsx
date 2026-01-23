'use client';

import { ReactNode } from 'react';
import CartDrawer from './CartDrawer';

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}


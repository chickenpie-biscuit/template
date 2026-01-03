'use client';

import { ReactNode } from 'react';

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  // Zustand store is global, so we just need to render children
  return <>{children}</>;
}


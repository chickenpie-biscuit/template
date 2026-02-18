'use client';

import { ReactNode } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CartDrawer from './CartDrawer';

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      {children}
      <CartDrawer />
    </PayPalScriptProvider>
  );
}

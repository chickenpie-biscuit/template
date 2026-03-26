'use client';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCartStore, CartItem } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface PayPalCheckoutButtonProps {
  items: CartItem[];
}

export default function PayPalCheckoutButton({ items }: PayPalCheckoutButtonProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const router = useRouter();

  return (
    <PayPalButtons
      style={{
        color: 'black',
        shape: 'rect',
        layout: 'vertical',
        label: 'paypal',
      }}
      createOrder={async () => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        return data.orderID;
      }}
      onApprove={async (data) => {
        const res = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID: data.orderID, items }),
        });
        const result = await res.json();
        if (result.status === 'COMPLETED') {
          clearCart();
          closeCart();
          router.push('/shop/success');
        } else {
          console.error('Payment not completed:', result);
          alert('Payment was not completed. Please try again.');
        }
      }}
      onError={(err) => {
        console.error('PayPal error:', err);
        alert('An error occurred with PayPal. Please try again.');
      }}
      onCancel={() => {
        console.log('PayPal payment cancelled by user');
      }}
    />
  );
}

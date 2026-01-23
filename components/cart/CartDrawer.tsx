'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCartStore, CartItem } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { getStripe } from '@/lib/stripe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Checkout error:', data.error);
        alert('Error creating checkout session. Please try again.');
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        alert('Error redirecting to checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[100]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Cart panel - explicit solid background */}
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md shadow-2xl z-[101] flex flex-col border-l-4 border-black"
        style={{ backgroundColor: '#F5F1E8' }}
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-cream">
          <h2 className="text-xl font-heading font-bold uppercase tracking-wide">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black hover:text-cream rounded-full transition-colors border-2 border-black"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-cream">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-black/50 font-body">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border-2 border-black bg-white"
                >
                  {item.image && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-heading font-bold uppercase text-sm">{item.name}</h3>
                    <p className="text-sm text-black/60 font-body">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-black hover:text-white transition-colors border border-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-heading font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-black hover:text-white transition-colors border border-black"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1 text-red hover:bg-red hover:text-white transition-colors border border-red"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-2 border-black p-4 space-y-4 bg-cream">
            <div className="flex justify-between text-lg font-heading font-bold uppercase">
              <span>Total:</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Checkout with Stripe'}
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-sm font-heading text-black/50 hover:text-black uppercase tracking-wide"
              disabled={isLoading}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}


import { loadStripe } from '@stripe/stripe-js';

export const getStripe = () => {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!stripeKey) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  }
  return loadStripe(stripeKey);
};


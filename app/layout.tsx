import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import CartProvider from '@/components/cart/CartProvider';
import GSAPProvider from '@/components/providers/GSAPProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Chickenpie - Spreading love, chickens & art',
  description: 'A creative universe that functions as both a design studio and lifestyle brand. Design services, merchandise, food content, and original art.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-body`}>
        <GSAPProvider>
          <CartProvider>{children}</CartProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}


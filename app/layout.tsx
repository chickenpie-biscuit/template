import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CartProvider from '@/components/cart/CartProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Site Template',
  description: 'A Next.js and Sanity CMS template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}


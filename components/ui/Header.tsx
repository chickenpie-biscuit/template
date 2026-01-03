'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import CartButton from '@/components/cart/CartButton';
import Container from './Container';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">
              Site Template
            </span>
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/shop"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartButton />
            <button
              className="md:hidden p-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}


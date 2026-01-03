'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import CartButton from '@/components/cart/CartButton';
import Container from './Container';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b-2 border-black">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <span className="text-2xl font-heading font-bold uppercase tracking-tight text-black">
              Chickenpie
            </span>
          </Link>

          {/* Primary Navigation - Center (Desktop) */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-black hover:text-red-200 font-body uppercase text-sm tracking-wide transition-colors"
            >
              Feed
            </Link>
            <Link
              href="/studio"
              className="text-black hover:text-red-200 font-body uppercase text-sm tracking-wide transition-colors"
            >
              Studio
            </Link>
            <Link
              href="/shop"
              className="text-black hover:text-red-200 font-body uppercase text-sm tracking-wide transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-black hover:text-red-200 font-body uppercase text-sm tracking-wide transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-black hover:text-red-200 font-body uppercase text-sm tracking-wide transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Cart & Mobile Menu - Right */}
          <div className="flex items-center space-x-4">
            <CartButton />
            <button
              className="lg:hidden p-2 text-black hover:text-red-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-cream z-40 pt-20">
            <nav className="px-4 py-8">
              <div className="flex flex-col space-y-6">
                <Link
                  href="/"
                  className="text-black hover:text-red-200 font-body uppercase text-lg tracking-wide transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Feed
                </Link>
                <Link
                  href="/studio"
                  className="text-black hover:text-red-200 font-body uppercase text-lg tracking-wide transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Studio
                </Link>
                <Link
                  href="/shop"
                  className="text-black hover:text-red-200 font-body uppercase text-lg tracking-wide transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-black hover:text-red-200 font-body uppercase text-lg tracking-wide transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-black hover:text-red-200 font-body uppercase text-lg tracking-wide transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}


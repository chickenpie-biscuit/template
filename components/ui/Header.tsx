'use client';

import Link from 'next/link';
import { useState, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';
import CartButton from '@/components/cart/CartButton';
import Container from './Container';
import NewsletterSignup from './NewsletterSignup';

export default memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/studio', label: 'Studio' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md border-b-2 border-black">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2 z-50 group">
            <span className="text-2xl font-heading font-bold uppercase tracking-tight text-black group-hover:text-[var(--color-accent)] transition-colors">
              NXT
            </span>
          </Link>

          {/* Primary Navigation - Center (Desktop) */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-black font-body uppercase text-sm tracking-wide group overflow-hidden"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute left-0 top-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[var(--color-accent)]">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu - Right */}
          <div className="flex items-center space-x-4">
            <div data-cursor-text="CART">
              <CartButton />
            </div>
            <button
              className="lg:hidden p-2 text-black hover:text-[var(--color-accent)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-[var(--color-bg)] border-t-2 border-black animate-in fade-in slide-in-from-top-4 duration-200"
            style={{ top: '80px', height: 'calc(100vh - 80px)' }}
          >
            <nav className="px-6 py-8 h-full flex flex-col justify-between overflow-y-auto max-w-md mx-auto w-full">
              <div className="flex flex-col space-y-8 mt-4">
                {links.map((link, index) => (
                  <div
                    key={link.href}
                    className="animate-in fade-in slide-in-from-left-4"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                  >
                    <Link
                      href={link.href}
                      className="text-5xl font-heading font-bold uppercase tracking-tight text-black hover:text-[var(--color-accent)] transition-colors inline-block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div
                className="pb-12 border-t-2 border-black/10 pt-8 mt-auto animate-in fade-in"
                style={{ animationDelay: '300ms', animationFillMode: 'both' }}
              >
                <div className="mb-8">
                  <NewsletterSignup source="header" variant="inline" className="justify-center" />
                </div>
                <p className="text-sm font-body text-black/40 uppercase tracking-widest">
                  Template Demo
                </p>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
});
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import CartButton from '@/components/cart/CartButton';
import Container from './Container';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const links = [
    { href: '/', label: 'Feed' },
    { href: '/studio', label: 'Studio' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b-2 border-black">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2 z-50 group">
            <span className="text-2xl font-heading font-bold uppercase tracking-tight text-black group-hover:text-red transition-colors" data-cursor-text="HOME">
              Chickenpie
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
                <span className="absolute left-0 top-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-red">
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
              className="lg:hidden p-2 text-black hover:text-red transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed left-0 right-0 bottom-0 z-40 border-t-2 border-black bg-[#F5F1E8]"
              style={{ top: '80px', height: 'calc(100vh - 80px)' }}
            >
              <nav className="px-6 py-8 h-full flex flex-col justify-between overflow-y-auto max-w-md mx-auto w-full bg-[#F5F1E8]">
                <div className="flex flex-col space-y-8 mt-4">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="text-5xl font-heading font-bold uppercase tracking-tight text-black hover:text-red transition-colors inline-block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pb-12 border-t-2 border-black/10 pt-8 mt-auto"
                >
                  <p className="text-xs font-heading font-bold uppercase tracking-widest text-black/40 mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-6 mb-8">
                    <a href="https://instagram.com/chickenpie" target="_blank" rel="noopener noreferrer" className="text-black hover:text-red transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="https://twitter.com/chickenpie" target="_blank" rel="noopener noreferrer" className="text-black hover:text-red transition-colors">
                      <Twitter size={24} />
                    </a>
                  </div>
                  <p className="text-sm font-body text-black/60 uppercase tracking-widest">
                    Based in the Universe
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

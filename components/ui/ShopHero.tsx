'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from './Container';

export default function ShopHero() {
  return (
    <section className="py-20 lg:py-32 bg-red-200 border-b-2 border-black">
      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-6 text-black leading-tight">
            Shop Chickenpie
          </h1>
          <p className="font-body text-lg mb-8 text-black/80">
            Spread love, chickens & art with our latest merchandise drops
          </p>
          <Link
            href="#products"
            className="inline-block px-8 py-4 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:bg-black/90 transition-colors"
          >
            Shop Collection
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}


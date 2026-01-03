'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function ShopHero() {
  return (
    <section className="py-24 lg:py-40 bg-cream border-b-2 border-black">
      <Container>
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Minimal Header */}
          <h1 className="text-6xl lg:text-9xl font-heading font-bold uppercase mb-12 text-black leading-[0.9] tracking-tight">
            Shop.<br />
            Goods.
          </h1>

          {/* Intro Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <p className="font-body text-xl lg:text-2xl text-black leading-relaxed">
              A curated collection of goods for everyday life. Designed with love, made to last.
            </p>
            <p className="font-body text-lg text-black/60 leading-relaxed">
              Limited drops, art prints, and essentials that bring a little joy to your routine.
              When they're gone, they're gone.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

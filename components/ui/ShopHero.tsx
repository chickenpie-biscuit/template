'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function ShopHero() {
  const scrollToProducts = () => {
    const productsSection = document.querySelector('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-cream border-b-2 border-black">
      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-black text-cream px-4 py-2 mb-6 border-2 border-black"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-wider">
              Limited Drops
            </span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-6 text-black leading-tight">
            Chickenpie Shop
          </h1>
          <p className="font-body text-lg mb-8 text-black/80 max-w-2xl mx-auto">
            Spread love, chickens & art with our curated collection.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

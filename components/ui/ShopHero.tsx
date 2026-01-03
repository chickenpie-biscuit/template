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
    <section className="py-20 lg:py-32 bg-teal border-b-2 border-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black/10 rotate-12" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-goldenrod/20 border-2 border-black/10 -rotate-6" />
      
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
            Spread love, chickens & art with our curated collection of merchandise, art prints, and unique finds
          </p>
          <button
            onClick={scrollToProducts}
            className="inline-block px-8 py-4 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300"
          >
            Browse Collection
          </button>
        </motion.div>
      </Container>
    </section>
  );
}


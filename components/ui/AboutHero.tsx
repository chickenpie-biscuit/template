'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function AboutHero() {
  return (
    <section className="py-20 lg:py-32 bg-goldenrod border-b-2 border-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 border-4 border-black/10 rotate-12" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-red/20 border-2 border-black/10 -rotate-6" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal/20 border-2 border-black/10 rotate-45" />
      
      <Container>
        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-black text-cream px-6 py-3 mb-8 border-2 border-black"
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="font-heading text-sm font-bold uppercase tracking-wider">
              About Us
            </span>
          </motion.div>
          
          <h1 className="text-6xl lg:text-8xl font-heading font-bold uppercase mb-8 text-black leading-tight">
            Spreading Love,
            <br />
            Chickens & Art
          </h1>
          <p className="font-body text-xl lg:text-2xl text-black/80 leading-relaxed max-w-3xl mx-auto">
            A creative universe where design meets lifestyle. We build brands, create art, 
            share delicious finds, and celebrate the weird and wonderful.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function AboutHero() {
  return (
    <section className="py-20 lg:py-32 bg-cream border-b-2 border-black">
      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-6 text-black leading-tight">
            What is Chickenpie?
          </h1>
          <div className="w-32 h-32 mx-auto bg-red-200 border-2 border-black flex items-center justify-center mb-8">
            <span className="text-6xl">🐔</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}


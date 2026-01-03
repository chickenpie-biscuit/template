'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function StudioHero() {
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
            Selected<br />
            Works.
          </h1>

          {/* Intro Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <p className="font-body text-xl lg:text-2xl text-black leading-relaxed">
              We craft visual identities, digital experiences, and creative strategies that stand out.
            </p>
            <p className="font-body text-lg text-black/60 leading-relaxed">
              From branding to art direction, our work is driven by bold ideas and meticulous execution. 
              We partner with brands to create lasting impact.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

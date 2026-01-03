'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function BrandStory() {
  return (
    <section className="py-24 lg:py-32 bg-cream border-b-2 border-black">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                01
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase text-black">
                The Philosophy
              </h2>
            </div>

            <div className="space-y-8 font-body text-xl lg:text-2xl text-black leading-relaxed">
              <p>
                Chickenpie started as a creative experiment—a way to blend professional
                design work with the playful, unexpected elements that make life interesting.
              </p>
              <p className="text-black/60">
                We believe that great design doesn&apos;t have to take itself too seriously, 
                and that the best work happens when you&apos;re having fun. Whether we&apos;re 
                designing a brand identity or a t-shirt, the approach is the same: 
                bold, intentional, and slightly unexpected.
              </p>
            </div>

            <div className="pt-16 border-t-2 border-black/10">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                  02
                </span>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase text-black">
                  The Mission
                </h2>
              </div>
              <p className="font-body text-xl lg:text-2xl text-black leading-relaxed">
                To create a universe where art, design, food, and community collide. 
                No boundaries, just good work and good vibes.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

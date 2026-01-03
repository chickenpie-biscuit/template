'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-32 bg-cream border-b-2 border-black">
      <Container>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-heading font-bold uppercase mb-8 text-black">
              The Story
            </h2>
            <div className="space-y-6 font-body text-xl text-black/80 leading-relaxed">
              <p>
                Chickenpie started as a creative outlet and evolved into something much bigger—a 
                universe where art, design, food, and community come together.
              </p>
              <p>
                We&apos;re not just a design studio. We&apos;re not just a brand. We&apos;re a creative 
                experiment in living boldly, sharing generously, and building something that 
                doesn&apos;t fit neatly into a box.
              </p>
              <p>
                From brand identities to merch drops, food content to original art, we create 
                with intention and share with love. Because creativity shouldn&apos;t have boundaries, 
                and neither should you.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black text-cream border-2 border-black p-12 lg:p-16 text-center relative"
          >
            <div className="absolute top-4 right-4 text-6xl font-heading text-cream/10">
              &ldquo;
            </div>
            <div className="absolute bottom-4 left-4 text-6xl font-heading text-cream/10 rotate-180">
              &ldquo;
            </div>
            <blockquote className="text-3xl lg:text-4xl font-heading font-bold uppercase text-cream leading-tight relative z-10">
              We create things we love and share them with people who get it
            </blockquote>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

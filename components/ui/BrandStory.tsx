'use client';

import { motion } from 'framer-motion';
import Container from './Container';

export default function BrandStory() {
  return (
    <section className="py-16 lg:py-24 bg-cream border-b-2 border-black">
      <Container>
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="prose prose-lg max-w-none font-body text-black/80 space-y-4">
            <p>
              Chickenpie started as a creative experiment—a way to blend professional
              design work with the playful, unexpected elements that make life interesting.
              We're a design studio and lifestyle brand rolled into one, because why choose
              between making beautiful things for clients and making beautiful things for
              ourselves?
            </p>
            <p>
              Our mission is simple: spread love, chickens, and art through playful design
              and responsible creative work. We believe that great design doesn't have to
              take itself too seriously, and that the best work happens when you're having
              fun.
            </p>
            <p>
              Why chickens? Because they're unexpected, a little absurd, and surprisingly
              resilient. They remind us not to take ourselves too seriously while still
              doing serious work. Plus, they're just fun to draw.
            </p>
            <p>
              Whether we're designing a brand identity, building a website, creating
              merchandise, or sharing our latest food find, everything we do is filtered
              through our unique lens: playful but professional, creatively responsible,
              and always ready to embrace the random.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}


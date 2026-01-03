'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from './Container';

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-red-200 border-b-2 border-black">
      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-heading font-bold uppercase mb-4 text-black">
            Want to work together?
          </h2>
          <p className="font-body text-lg mb-8 text-black/80">
            Let's create something amazing. Whether you need design services or just want
            to say hi, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/studio"
              className="inline-block px-8 py-4 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:bg-black/90 transition-colors"
            >
              View Studio
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-cream text-black border-2 border-black font-heading font-bold uppercase hover:bg-cream-200 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-black">
            <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-black">
              Join the flock
            </h3>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-cream text-black border-2 border-black font-body focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:bg-black/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}


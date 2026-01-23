'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from './Container';
import { Truck, Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function ShopHero() {
  return (
    <section className="bg-black text-cream border-b-2 border-cream/20">
      <Container>
        <div className="py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-goldenrod text-black px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="font-heading font-bold uppercase text-xs tracking-[0.2em]">
                New Drops Weekly
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-heading font-bold uppercase leading-[0.85] tracking-tight text-cream mb-8">
              Shop the<br />
              <span className="text-goldenrod">Collection</span>
            </h1>

            {/* Subtext */}
            <p className="font-body text-xl lg:text-2xl text-cream/70 max-w-2xl mb-12 leading-relaxed">
              Limited edition goods, exclusive merch drops, and everyday essentials. 
              Designed with intention, made with love.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 lg:gap-12 pt-8 border-t border-cream/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cream/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-goldenrod" />
                </div>
                <div>
                  <p className="font-heading font-bold uppercase text-sm text-cream">Free Shipping</p>
                  <p className="font-body text-xs text-cream/50">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cream/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-goldenrod" />
                </div>
                <div>
                  <p className="font-heading font-bold uppercase text-sm text-cream">Secure Checkout</p>
                  <p className="font-body text-xs text-cream/50">SSL encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cream/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-goldenrod" />
                </div>
                <div>
                  <p className="font-heading font-bold uppercase text-sm text-cream">Quality Guaranteed</p>
                  <p className="font-body text-xs text-cream/50">30-day returns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

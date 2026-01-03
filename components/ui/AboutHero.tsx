'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import { Palette, Utensils, Monitor, ShoppingBag } from 'lucide-react';

export default function AboutHero() {
  const services = [
    { icon: Palette, label: 'Creative Direction' },
    { icon: Utensils, label: 'Food & Lifestyle' },
    { icon: Monitor, label: 'Digital Design' },
    { icon: ShoppingBag, label: 'Merchandise' },
  ];

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
            Design.<br />
            Lifestyle.<br />
            Universe.
          </h1>

          {/* Intro Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
            <p className="font-body text-xl lg:text-2xl text-black leading-relaxed">
              We are a creative studio and lifestyle brand blurring the lines between work and play.
            </p>
            <p className="font-body text-lg text-black/60 leading-relaxed">
              Founded on the belief that everything is content and design is everywhere. 
              We build brands, curate experiences, and create things we actually want to use.
            </p>
          </div>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t-2 border-black/10">
            {services.map((service, index) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-start gap-4 group"
              >
                <div className="p-4 border-2 border-black rounded-full group-hover:bg-black group-hover:text-cream transition-colors duration-300">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-heading font-bold uppercase text-sm tracking-wider">
                  {service.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

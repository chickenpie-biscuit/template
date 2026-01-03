'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import { ArrowRight } from 'lucide-react';

const team = [
  {
    role: 'Creative Direction',
    description: 'Bringing bold ideas to life through design, art, and storytelling',
  },
  {
    role: 'Food & Content',
    description: 'Sharing delicious discoveries and culinary adventures',
  },
  {
    role: 'Design Studio',
    description: 'Crafting visual identities and digital experiences for clients',
  },
  {
    role: 'Merch & Products',
    description: 'Curating unique items that spread love and creativity',
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 lg:py-32 bg-cream border-b-2 border-black">
      <Container>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-baseline gap-4 mb-16"
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">
              03
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase text-black">
              What We Do
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {team.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group border-t-2 border-black pt-6"
              >
                <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-black group-hover:text-black/60 transition-colors">
                  {item.role}
                </h3>
                <p className="font-body text-lg text-black/60 leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <ArrowRight size={24} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-32 pt-12 border-t-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="font-heading text-sm uppercase tracking-wider text-black/40 mb-2">
                Start a conversation
              </p>
              <h3 className="font-heading text-2xl font-bold uppercase">
                Have an idea? Let&apos;s talk.
              </h3>
            </div>
            <a
              href="mailto:hello@chickenpie.co"
              className="group flex items-center gap-4 text-3xl lg:text-5xl font-heading font-bold text-black hover:text-black/60 transition-colors"
            >
              hello@chickenpie.co
              <ArrowRight className="transform group-hover:translate-x-4 transition-transform duration-300" size={48} />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

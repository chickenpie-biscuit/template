'use client';

import { motion } from 'framer-motion';
import Container from './Container';

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
    <section className="py-20 lg:py-32 bg-teal border-b-2 border-black">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-6 text-black">
            What We Do
          </h2>
          <p className="font-body text-lg text-black/80 max-w-3xl mx-auto">
            A bunch of super cool people all over the world doing super cool stuff
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="border-2 border-black bg-cream p-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-black">
                {item.role}
              </h3>
              <p className="font-body text-black/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="font-heading text-sm uppercase tracking-wider text-black/60 mb-3">
            Say Hello
          </p>
          <a
            href="mailto:hello@chickenpie.co"
            className="inline-block text-3xl lg:text-4xl font-heading font-bold text-black hover:text-red transition-colors"
          >
            hello@chickenpie.co
          </a>
        </motion.div>
      </Container>
    </section>
  );
}


'use client';

import { motion } from 'framer-motion';
import Container from './Container';

const values = [
  {
    title: 'Playful but Professional',
    description: 'We bring personality to every project without sacrificing quality or results.',
    icon: '🎨',
  },
  {
    title: 'Creatively Responsible',
    description: 'We take our work seriously and deliver on time, every time.',
    icon: '✨',
  },
  {
    title: 'Embrace the Random',
    description: 'The best ideas come from unexpected places. We welcome the weird.',
    icon: '🌟',
  },
  {
    title: 'Love, Chickens & Art',
    description: 'At the end of the day, it is all about spreading joy through what we create.',
    icon: '🐔',
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 lg:py-24 bg-cream border-b-2 border-black">
      <Container>
        <motion.h2
          className="text-4xl font-heading font-bold uppercase text-center mb-12 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-heading font-bold uppercase mb-3 text-black">
                {value.title}
              </h3>
              <p className="font-body text-black/80 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}


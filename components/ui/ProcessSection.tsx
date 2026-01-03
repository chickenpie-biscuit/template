'use client';

import { motion } from 'framer-motion';
import Container from './Container';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn about your project and goals',
  },
  {
    number: '02',
    title: 'Creation',
    description: 'We design, iterate, and refine',
  },
  {
    number: '03',
    title: 'Delivery',
    description: 'Final files and ongoing support',
  },
];

export default function ProcessSection() {
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
          Our Process
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-6xl font-heading font-bold text-red-200 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-black">
                {step.title}
              </h3>
              <p className="font-body text-black/80">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}


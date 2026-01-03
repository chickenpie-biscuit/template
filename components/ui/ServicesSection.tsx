'use client';

import { motion } from 'framer-motion';
import Container from './Container';

const services = [
  {
    title: 'Branding & Identity',
    description: 'Logo design, brand guidelines, visual systems, print collateral',
    icon: '🎨',
  },
  {
    title: 'Web Design & Development',
    description: 'Websites, landing pages, e-commerce, web apps, responsive design',
    icon: '💻',
  },
  {
    title: 'Illustration & Art',
    description: 'Custom illustrations, poster design, merchandise graphics, digital art',
    icon: '✏️',
  },
];

export default function ServicesSection() {
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
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-cream border-2 border-black p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-heading font-bold uppercase mb-4 text-black">
                {service.title}
              </h3>
              <p className="font-body text-black/80">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}


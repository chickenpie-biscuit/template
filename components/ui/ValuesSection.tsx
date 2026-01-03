'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import { Heart, Smile, Sparkles, Bird } from 'lucide-react';

const values = [
  {
    title: 'Playful but Professional',
    description: 'We bring personality to every project without sacrificing quality or results.',
    icon: Smile,
  },
  {
    title: 'Creatively Responsible',
    description: 'We take our work seriously and deliver on time, every time.',
    icon: Sparkles,
  },
  {
    title: 'Embrace the Random',
    description: 'The best ideas come from unexpected places. We welcome the weird.',
    icon: Heart,
  },
  {
    title: 'Love, Chickens & Art',
    description: 'At the end of the day, it is all about spreading joy through what we create.',
    icon: Bird,
  },
];

export default function ValuesSection() {
  return (
    <section className="py-24 lg:py-32 bg-cream border-b-2 border-black">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 border-2 border-black rounded-full group-hover:bg-black group-hover:text-cream transition-colors duration-300">
                  <value.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold uppercase mb-4 text-black">
                {value.title}
              </h3>
              <p className="font-body text-base text-black/80 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

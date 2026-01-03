'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './Container';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What's your typical turnaround time?",
    answer:
      'Project timelines vary depending on scope and complexity. Most branding projects take 4-6 weeks, web projects 6-12 weeks, and illustration work 1-3 weeks. We will provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes! We ship our merchandise worldwide. Shipping costs and delivery times vary by location. You can see exact shipping costs at checkout.',
  },
  {
    question: 'Can I commission custom work?',
    answer:
      'Absolutely! We love custom projects. Whether it is a custom illustration, branded merchandise, or a full design project, reach out through our contact form and we can discuss your needs.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-cream border-b-2 border-black">
      <Container>
        <motion.h2
          className="text-4xl font-heading font-bold uppercase text-center mb-12 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-cream border-2 border-black overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-cream-200 transition-colors"
              >
                <span className="font-heading font-bold uppercase text-black">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-black transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t-2 border-black">
                      <p className="font-body text-black/80">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}


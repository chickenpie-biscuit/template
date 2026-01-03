'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from './Container';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
    budgetRange: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement form submission to API endpoint
    // For now, just simulate success
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'general',
        message: '',
        budgetRange: '',
      });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <section className="py-16 bg-cream border-b-2 border-black">
        <Container>
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-red-200 border-2 border-black p-8">
              <h2 className="text-3xl font-heading font-bold uppercase mb-4 text-black">
                Message Sent!
              </h2>
              <p className="font-body text-lg text-black/80 mb-6">
                Thanks for reaching out. We will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:bg-black/90 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream border-b-2 border-black">
      <Container>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-heading font-bold uppercase text-sm mb-2 text-black"
            >
              Name <span className="text-red-200">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cream border-2 border-black font-body text-black focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-heading font-bold uppercase text-sm mb-2 text-black"
            >
              Email <span className="text-red-200">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cream border-2 border-black font-body text-black focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>

          {/* Inquiry Type */}
          <div>
            <label
              htmlFor="inquiryType"
              className="block font-heading font-bold uppercase text-sm mb-2 text-black"
            >
              Inquiry Type <span className="text-red-200">*</span>
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cream border-2 border-black font-body text-black focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <option value="project">Project Inquiry</option>
              <option value="shop">Shop Question</option>
              <option value="general">General</option>
              <option value="press">Press</option>
            </select>
          </div>

          {/* Budget Range (conditional) */}
          {formData.inquiryType === 'project' && (
            <div>
              <label
                htmlFor="budgetRange"
                className="block font-heading font-bold uppercase text-sm mb-2 text-black"
              >
                Budget Range (Optional)
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-cream border-2 border-black font-body text-black focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="">Select a range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block font-heading font-bold uppercase text-sm mb-2 text-black"
            >
              Message <span className="text-red-200">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cream border-2 border-black font-body text-black focus:outline-none focus:ring-2 focus:ring-red-200 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-red-200 text-black border-2 border-black font-heading font-bold uppercase hover:bg-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </Container>
    </section>
  );
}


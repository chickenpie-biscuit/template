'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    budgetRange: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          inquiryType: formData.inquiryType,
          message: formData.message,
          budgetRange: formData.budgetRange,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          inquiryType: '',
          budgetRange: '',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inquiryTypes = [
    { value: 'branding', label: 'Branding' },
    { value: 'web-design', label: 'Web Design' },
    { value: 'illustration', label: 'Illustration' },
    { value: 'product-design', label: 'Product Design' },
    { value: 'shop', label: 'Shop Question' },
    { value: 'general', label: 'General Inquiry' },
  ];

  return (
    <section className="pt-16 lg:pt-24 pb-8 lg:pb-12 bg-cream">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-6 text-black leading-tight">
            Let&apos;s Make Something Bright
          </h1>
          <p className="font-body text-lg text-black/80 max-w-2xl mx-auto">
            Ready to spread some love and creativity? We&apos;re here to make it happen.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block font-heading text-xs uppercase tracking-wider text-black/60 mb-2">
                <span className="text-red">01</span> First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-0 py-4 bg-transparent border-b-2 border-black font-body text-black placeholder:text-black/30 focus:outline-none focus:border-red transition-colors"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-heading text-xs uppercase tracking-wider text-black/60 mb-2">
                <span className="text-red">02</span> Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-0 py-4 bg-transparent border-b-2 border-black font-body text-black placeholder:text-black/30 focus:outline-none focus:border-red transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-heading text-xs uppercase tracking-wider text-black/60 mb-2">
              <span className="text-red">03</span> Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter a valid email"
              className="w-full px-0 py-4 bg-transparent border-b-2 border-black font-body text-black placeholder:text-black/30 focus:outline-none focus:border-red transition-colors"
            />
          </div>

          {/* Budget Range */}
          <div>
            <label className="block font-heading text-xs uppercase tracking-wider text-black/60 mb-2">
              <span className="text-red">04</span> Your Budget?
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full px-0 py-4 bg-transparent border-b-2 border-black font-body text-black focus:outline-none focus:border-red transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select your budget</option>
              <option value="not-sure">Not sure</option>
              <option value="under-5k">Under $5k</option>
              <option value="5k-10k">$5k - $10k</option>
              <option value="10k-25k">$10k - $25k</option>
              <option value="25k-plus">$25k+</option>
            </select>
          </div>

          {/* What can we do for you */}
          <div>
            <label className="block font-heading text-xs uppercase tracking-wider text-black/60 mb-4">
              <span className="text-red">05</span> What can we do for you?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {inquiryTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center gap-3 p-4 border-2 border-black cursor-pointer transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${
                    formData.inquiryType === type.value
                      ? 'bg-red text-cream'
                      : 'bg-cream text-black'
                  }`}
                >
                  <input
                    type="radio"
                    name="inquiryType"
                    value={type.value}
                    checked={formData.inquiryType === type.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 border-2 flex items-center justify-center ${
                    formData.inquiryType === type.value
                      ? 'border-cream bg-cream'
                      : 'border-black'
                  }`}>
                    {formData.inquiryType === type.value && (
                      <div className="w-2 h-2 bg-red" />
                    )}
                  </div>
                  <span className="font-heading text-sm font-bold uppercase">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block font-heading text-xs uppercase tracking-wider text-black/60 mb-2">
              <span className="text-red">06</span> Your Message *
            </label>
            <textarea
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full px-0 py-4 bg-transparent border-b-2 border-black font-body text-black placeholder:text-black/30 focus:outline-none focus:border-red transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className="group px-12 py-5 bg-black text-cream border-2 border-black font-heading font-bold uppercase text-lg hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 bg-teal border-2 border-black"
            >
              <p className="font-heading font-bold uppercase text-black">
                ✓ Your message has been sent!
              </p>
              <p className="font-body text-sm text-black/80 mt-2">
                We&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 bg-red text-cream border-2 border-black"
            >
              <p className="font-heading font-bold uppercase">
                ✗ Oops! Something went wrong
              </p>
              <p className="font-body text-sm mt-2">
                Please try again or email us directly.
              </p>
            </motion.div>
          )}
        </motion.form>

      </div>
    </section>
  );
}

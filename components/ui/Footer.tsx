'use client';

import Link from 'next/link';
import Container from './Container';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[var(--color-bg)] border-t-2 border-black overflow-hidden">
      <div className="pt-16 pb-8 md:pt-24 md:pb-12 px-4 md:px-8">
        {/* Massive Wordmark */}
        <div className="w-full border-b-2 border-white/20 mb-16 pb-8">
          <h1 className="text-[12vw] leading-[0.8] font-heading font-bold uppercase text-center tracking-tighter text-[var(--color-bg)] select-none pointer-events-none">
            NXT
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col justify-between h-full min-h-[200px]">
            <div>
              <h3 className="text-xl font-heading font-bold uppercase mb-4">
                Template Demo
              </h3>
              <p className="text-lg font-body text-white/60 max-w-xs leading-relaxed">
                A production-ready Next.js + Sanity template. Built for fast reskinning and easy deployment.
              </p>
            </div>

            <div className="mt-auto pt-8">
              <a
                href="mailto:hello@template.dev"
                className="text-2xl font-heading font-bold uppercase hover:text-[var(--color-accent)] transition-colors inline-block relative group"
              >
                hello@template.dev
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-heading font-bold uppercase text-sm tracking-widest text-white/40 mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {['Home', 'Studio', 'Shop', 'About'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-xl font-body uppercase hover:text-[var(--color-accent)] transition-colors inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-heading font-bold uppercase text-sm tracking-widest text-white/40 mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-xl font-body uppercase hover:text-[var(--color-accent)] transition-colors inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/chickenpie-biscuit/template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-body uppercase hover:text-[var(--color-accent)] transition-colors inline-block"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-heading font-bold uppercase text-sm tracking-widest text-white/40 mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-xl font-body uppercase hover:text-[var(--color-accent)] transition-colors inline-block">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xl font-body uppercase hover:text-[var(--color-accent)] transition-colors inline-block">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 mb-8">
          <NewsletterSignup source="footer" variant="banner" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <p className="font-body text-sm text-white/40 uppercase tracking-wide">
            © {currentYear} NXT Template. All rights reserved.
          </p>
          <p className="font-body text-sm text-white/40 uppercase tracking-wide">
            Built on Next.js + Sanity
          </p>
        </div>
      </div>
    </footer>
  );
}
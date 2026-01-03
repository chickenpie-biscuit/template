'use client';

import Link from 'next/link';
import Container from './Container';
import { Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-cream border-t-2 border-black">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-cream text-xl font-heading font-bold uppercase mb-4">
              Chickenpie
            </h3>
            <p className="text-sm font-body text-cream/80">
              Spreading love, chickens & art
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-cream font-heading font-bold uppercase mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <Link href="/studio" className="hover:text-red-200 transition-colors">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-red-200 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-200 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Social */}
          <div>
            <h4 className="text-cream font-heading font-bold uppercase mb-4 text-sm">
              Social
            </h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a
                  href="https://instagram.com/chickenpie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-200 transition-colors flex items-center gap-2"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/chickenpie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-200 transition-colors flex items-center gap-2"
                >
                  <Twitter size={16} />
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com/chickenpie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-200 transition-colors"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-cream font-heading font-bold uppercase mb-4 text-sm">
              Join the flock
            </h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-cream text-black border-2 border-black font-body text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-200 text-black border-2 border-black font-heading font-bold uppercase text-sm hover:bg-red-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-cream/20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-body">
          <p className="text-cream/80">
            &copy; {new Date().getFullYear()} Chickenpie. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-red-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-red-200 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}


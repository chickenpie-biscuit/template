import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { ArrowRight, Layers, Code, Palette } from 'lucide-react';

const pages = [
  { label: 'Home', href: '/', desc: 'Hero + feature showcase + CMS demo' },
  { label: 'Shop', href: '/shop', desc: 'E-commerce grid + product cards' },
  { label: 'About', href: '/about', desc: 'Brand story + team section' },
  { label: 'Contact', href: '/contact', desc: 'Form + FAQ + newsletter' },
  { label: 'Blog', href: '/blog', desc: 'Content feed + archive' },
];

const features = [
  {
    icon: Layers,
    title: 'Next.js 14 App Router',
    desc: 'File-based routing, Server Components, API routes.',
  },
  {
    icon: Palette,
    title: 'Tailwind CSS + CSS Variables',
    desc: 'Utility-first with a full design token system via :root variables.',
  },
  {
    icon: Code,
    title: 'Sanity CMS Pre-Wired',
    desc: 'Full schema, Studio at /studio, graceful fallback without env vars.',
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="py-24 lg:py-40 border-b-2 border-black">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-baseline gap-6 mb-12">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">Studio</span>
            </div>
            <h1 className="text-6xl lg:text-9xl font-heading font-bold uppercase mb-12 leading-[0.9] tracking-tight">
              Selected<br />Works.
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="font-body text-xl lg:text-2xl text-black/60 leading-relaxed">
                This template is a showcase of what&apos;s possible — every page, component, and style is designed to be reskinned and reused.
              </p>
              <p className="font-body text-lg text-black/60 leading-relaxed">
                Replace the content, swap the colors, add your brand. In minutes, not weeks.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-20 border-b-2 border-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
            {features.map((f, i) => (
              <div key={f.title} className="p-10 border-b border-r border-black last:border-r-0 md:border-b-0 last:border-b-0">
                <div className="w-12 h-12 mb-6 border-2 border-black rounded-full flex items-center justify-center">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold uppercase text-lg mb-3">{f.title}</h3>
                <p className="font-body text-sm text-black/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PAGES GRID */}
      <section className="py-20 lg:py-32 border-b-2 border-black">
        <Container>
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">Pages</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase">Included Pages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="border-2 border-black p-8 hover:bg-black hover:text-white transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-pixel text-[10px] text-black/30 group-hover:text-white/40">NXT</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-bold uppercase text-xl mb-2">{page.label}</h3>
                <p className="font-body text-sm text-black/50 group-hover:text-white/60">{page.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CMS STATUS */}
      <section className="py-20 bg-black text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/20 p-8">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mb-4" />
              <p className="font-heading font-bold uppercase text-sm mb-2">Sanity CMS</p>
              <p className="font-body text-sm text-white/60">Requires project ID in .env.local</p>
            </div>
            <div className="border border-white/20 p-8">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mb-4" />
              <p className="font-heading font-bold uppercase text-sm mb-2">Resend Email</p>
              <p className="font-body text-sm text-white/60">Requires API key in .env.local</p>
            </div>
            <div className="border border-white/20 p-8">
              <div className="w-3 h-3 rounded-full bg-white/40 mb-4" />
              <p className="font-heading font-bold uppercase text-sm mb-2">E-Commerce</p>
              <p className="font-body text-sm text-white/60">Stripe + PayPal optional</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
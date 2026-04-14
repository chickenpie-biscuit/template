import Container from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { ArrowRight, Zap, Palette, Layers, Globe } from 'lucide-react';

export default function HomePage() {
  const features = [
    { icon: Zap, title: 'Next.js 14', desc: 'App Router, TypeScript, edge-ready.' },
    { icon: Palette, title: 'Tailwind CSS', desc: 'Utility-first. Reskin in minutes.' },
    { icon: Layers, title: 'Sanity CMS', desc: 'Headless CMS with graceful fallback.' },
    { icon: Globe, title: 'Vercel Deploy', desc: 'GitHub push → auto-deploy. Done.' },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">

      {/* HERO */}
      <section className="min-h-[90vh] flex items-center border-b-2 border-black bg-[var(--color-bg)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-0">
            <div>
              <div className="inline-block border-2 border-black px-4 py-2 mb-8">
                <span className="font-heading font-bold uppercase text-xs tracking-widest">
                  {siteConfig.hero.badge}
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-heading font-bold uppercase leading-[0.9] tracking-tighter text-black mb-8 whitespace-pre-line">
                {siteConfig.hero.title}
              </h1>
              <p className="font-body text-xl text-black/60 mb-12 max-w-md leading-relaxed">
                {siteConfig.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={siteConfig.hero.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-heading font-bold uppercase hover:bg-[var(--color-accent)] transition-colors"
                >
                  {siteConfig.hero.cta.label}
                  <ArrowRight size={18} />
                </a>
                <a
                  href={siteConfig.hero.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black font-heading font-bold uppercase hover:bg-black hover:text-white transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="border-4 border-black bg-black aspect-square flex items-center justify-center relative overflow-hidden">
              <span className="font-pixel text-white/10 text-6xl tracking-widest select-none">NXT</span>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[var(--color-accent)] opacity-20" />
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 lg:py-32 border-b-2 border-black bg-white">
        <Container>
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">01</span>
            <h2 className="text-5xl lg:text-6xl font-heading font-bold uppercase text-black">What&apos;s Inside</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-black">
            {features.map((f, i) => (
              <div key={f.title} className="p-8 border-b border-r border-black last:border-r-0">
                <div className="w-12 h-12 mb-6 border-2 border-black rounded-full flex items-center justify-center">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold uppercase text-lg mb-3">{f.title}</h3>
                <p className="font-body text-sm text-black/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RESKIN SECTION */}
      <section className="py-20 lg:py-32 border-b-2 border-black bg-[var(--color-bg)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-baseline gap-6 mb-8">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">02</span>
                <h2 className="text-5xl lg:text-6xl font-heading font-bold uppercase text-black leading-tight">One Config.<br />Infinite Brands.</h2>
              </div>
              <p className="font-body text-xl text-black/60 mb-8 leading-relaxed">
                Edit <code className="bg-black text-white px-2 py-1 font-mono">config/site.ts</code> to completely reskin the site. Colors, fonts, navigation, hero content — all in one file.
              </p>
              <div className="border-2 border-black bg-white p-6 font-mono text-sm text-black/80 space-y-2">
                <div><span className="text-[var(--color-accent)]">primary:</span> <span className="text-black">#000000</span></div>
                <div><span className="text-[var(--color-accent)]">accent:</span> <span className="text-black">#6366f1</span></div>
                <div><span className="text-[var(--color-accent)]">fontHeading:</span> <span className="text-black">&quot;Space Grotesk&quot;</span></div>
              </div>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 mt-8 font-heading font-bold uppercase text-sm hover:underline"
              >
                See a styled page demo <ArrowRight size={14} />
              </Link>
            </div>
            <div className="border-4 border-black p-8 bg-white">
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-black/10">
                  <div className="w-8 h-8 bg-[var(--color-accent)]" />
                  <span className="font-heading font-bold uppercase text-sm">Accent Swatch</span>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-black/10">
                  <div className="w-8 h-8 bg-black" />
                  <span className="font-heading font-bold uppercase text-sm">Primary Black</span>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-black/10">
                  <div className="w-8 h-8 bg-white border-2 border-black" />
                  <span className="font-heading font-bold uppercase text-sm">Surface White</span>
                </div>
                <div className="pt-2">
                  <p className="font-body text-xs text-black/40 uppercase tracking-widest mb-3">Current</p>
                  <p className="text-4xl font-heading font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Space Grotesk
                  </p>
                  <p className="font-mono text-sm text-black/40 mt-1">Headings & UI</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PAGES PREVIEW */}
      <section className="py-20 lg:py-32 border-b-2 border-black bg-white">
        <Container>
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">03</span>
            <h2 className="text-5xl lg:text-6xl font-heading font-bold uppercase text-black">Template Pages</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'Studio', href: '/studio' },
              { label: 'Shop', href: '/shop' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="border-2 border-black p-8 flex flex-col items-center justify-center text-center hover:bg-black hover:text-white transition-colors group"
              >
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-black/40 group-hover:text-white/60 mb-4">Page</span>
                <span className="font-heading font-bold uppercase text-xl">{page.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CMS SECTION */}
      <section className="py-20 lg:py-32 border-b-2 border-black bg-[var(--color-bg)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-baseline gap-6 mb-8 justify-center">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">04</span>
              <h2 className="text-5xl lg:text-6xl font-heading font-bold uppercase text-black">CMS-Ready</h2>
            </div>
            <p className="font-body text-xl text-black/60 mb-12 leading-relaxed">
              Sanity CMS is pre-configured but completely optional. Without it, the template runs in static/ISR mode. Add your project ID and it springs to life.
            </p>
            <div className="border-2 border-black bg-white p-8 text-left">
              <p className="font-mono text-xs text-black/40 mb-4 uppercase tracking-widest">.env.local</p>
              <div className="space-y-2 font-mono text-sm">
                <div><span className="text-black/40">#</span> <span className="text-[var(--color-accent)]">SANITY_PROJECT_ID</span><span className="text-black/40">=your_project_id</span></div>
                <div><span className="text-black/40">#</span> <span className="text-[var(--color-accent)]">RESEND_API_KEY</span><span className="text-black/40">=re_your_key</span></div>
                <div><span className="text-black/40">#</span> <span className="text-[var(--color-accent)]">PAYPAL_CLIENT_ID</span><span className="text-black/40">=your_id</span></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 lg:py-32 bg-black text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-8 leading-tight">
              Ready when you are.
            </h2>
            <p className="font-body text-xl text-white/60 mb-12">
              Clone the repo, edit one config file, ship your site.
            </p>
            <a
              href="https://github.com/chickenpie-biscuit/template"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-accent)] text-white font-heading font-bold uppercase text-lg hover:opacity-90 transition-opacity"
            >
              Start Building <ArrowRight size={18} />
            </a>
          </div>
        </Container>
      </section>

    </main>
  );
}
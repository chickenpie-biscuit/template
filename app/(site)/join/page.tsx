import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Subscribe | NXT Template',
  description: 'Subscribe for updates on new template releases, features, and design resources.',
  openGraph: {
    title: 'Subscribe | NXT Template',
    description: 'Stay updated on new template releases, features, and design resources.',
  },
};

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="py-24 lg:py-40 border-b-2 border-black">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-black/40 mb-6">
              NXT Web Template
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase text-black leading-[0.9] mb-8 tracking-tight">
              Stay<br />Updated
            </h1>

            <p className="font-body text-lg md:text-xl text-black/60 max-w-lg mx-auto mb-12 leading-relaxed">
              Get notified when new templates drop, features ship, or design resources go live. No spam, ever.
            </p>

            <form className="max-w-md mx-auto mb-8">
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="you@studio.com"
                  className="flex-1 border-2 border-black px-6 py-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-4 font-heading font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors border-l-2 border-black"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <p className="font-body text-xs text-black/40 uppercase tracking-wider">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </Container>
      </section>

      {/* What to expect */}
      <section className="bg-black text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold uppercase text-2xl text-center mb-12 tracking-tight">
              What You Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-heading font-bold uppercase text-sm mb-2">New Releases</h3>
                <p className="font-body text-sm text-white/50">
                  First access when new templates or starter kits ship.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-heading font-bold uppercase text-sm mb-2">Design Resources</h3>
                <p className="font-body text-sm text-white/50">
                  Freebies, UI assets, and design inspiration for your next project.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-heading font-bold uppercase text-sm mb-2">Feature Updates</h3>
                <p className="font-body text-sm text-white/50">
                  Changelogs, new components, and workflow improvements.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Back to site */}
      <section className="py-8 text-center border-t-2 border-black">
        <Link
          href="/"
          className="font-heading text-sm uppercase tracking-widest text-black/40 hover:text-black transition-colors underline underline-offset-4"
        >
          ← Back to site
        </Link>
      </section>
    </main>
  );
}
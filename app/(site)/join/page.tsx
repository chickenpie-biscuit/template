import { Metadata } from 'next';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join the Flock | Chickenpie',
  description: 'Get weekly updates on our journey with AI — what we\'re building, breaking, and learning along the way.',
  openGraph: {
    title: 'Join the Flock | Chickenpie',
    description: 'Weekly AI & design updates from the Chickenpie studio. No spam, just good vibes.',
  },
};

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-black/40 mb-6">
            The Chickenpie Newsletter
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase text-black leading-[0.9] mb-8 tracking-tight">
            Join the<br />Flock
          </h1>

          <p className="font-body text-lg md:text-xl text-black/70 max-w-lg mx-auto mb-12 leading-relaxed">
            Get weekly updates on our journey with AI — what we&apos;re building, breaking, and learning along the way. Plus design drops, creative chaos, and the occasional recipe.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <NewsletterSignup source="contact" variant="card" className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
          </div>

          <p className="font-body text-xs text-black/40 uppercase tracking-wider">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-black text-cream py-16 lg:py-20 border-t-2 border-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-bold uppercase text-2xl text-center mb-12 tracking-tight">
            What You&apos;ll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-red flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-heading font-bold uppercase text-sm mb-2">AI Journey</h3>
              <p className="font-body text-sm text-cream/60">
                What we&apos;re building with AI agents, automation, and creative tools.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-teal flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-heading font-bold uppercase text-sm mb-2">Design Drops</h3>
              <p className="font-body text-sm text-cream/60">
                New art, merch, and creative projects straight from the studio.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-goldenrod flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐔</span>
              </div>
              <h3 className="font-heading font-bold uppercase text-sm mb-2">Behind the Scenes</h3>
              <p className="font-body text-sm text-cream/60">
                The real stories behind running a creative studio — wins, fails, and lessons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to site */}
      <section className="bg-cream py-8 text-center">
        <Link
          href="/"
          className="font-heading text-sm uppercase tracking-widest text-black/40 hover:text-black transition-colors underline underline-offset-4"
        >
          ← Back to Chickenpie
        </Link>
      </section>
    </div>
  );
}

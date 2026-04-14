import Container from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="py-24 lg:py-40 border-b-2 border-black">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-baseline gap-6 mb-12">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">About</span>
            </div>
            <h1 className="text-6xl lg:text-9xl font-heading font-bold uppercase mb-12 leading-[0.9] tracking-tight">
              Design.<br />Code.<br />Ship.
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="font-body text-xl lg:text-2xl text-black/60 leading-relaxed">
                A production-ready template built for speed. Reskin in minutes, deploy in seconds.
              </p>
              <p className="font-body text-lg text-black/60 leading-relaxed">
                Built on Next.js 14, Tailwind CSS, and Sanity CMS. Every component, page, and style is designed to be customized and extended.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 lg:py-32 border-b-2 border-black">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">01</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase">The Philosophy</h2>
            </div>
            <p className="font-body text-xl lg:text-2xl text-black/80 leading-relaxed">
              Good templates shouldn&apos;t feel like templates. They should feel like a solid starting point that respects your time and creativity. Every decision in this template is made with that in mind.
            </p>
            <p className="font-body text-lg text-black/60 leading-relaxed">
              No bloat. No unnecessary dependencies. Just clean, maintainable code that ships fast and scales gracefully.
            </p>

            <div className="pt-16">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">02</span>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase">The Stack</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black">
                {['Next.js 14', 'Tailwind CSS', 'Sanity CMS', 'TypeScript'].map((item, i) => (
                  <div key={item} className="p-6 border-b border-r border-black last:border-r-0 last:border-b-0">
                    <p className="font-heading font-bold uppercase text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-black text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-8 leading-tight">
              See it in action.
            </h2>
            <p className="font-body text-xl text-white/60 mb-12">
              Browse the template pages, then edit config/site.ts to reskin the whole site.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white font-heading font-bold uppercase hover:bg-white hover:text-black transition-colors"
            >
              View Studio <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
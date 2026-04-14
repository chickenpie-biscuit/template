import Container from '@/components/ui/Container';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="py-24 lg:py-40 border-b-2 border-black">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-baseline gap-6 mb-12">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">Contact</span>
            </div>
            <h1 className="text-6xl lg:text-9xl font-heading font-bold uppercase mb-12 leading-[0.9] tracking-tight">
              Get in<br />Touch.
            </h1>
            <p className="font-body text-xl text-black/60 max-w-lg leading-relaxed">
              This is a template page. Edit components/ui/ContactForm.tsx to customize, or replace entirely with your own form handler.
            </p>
          </div>
        </Container>
      </section>

      {/* FORM PLACEHOLDER */}
      <section className="py-20 border-b-2 border-black">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="border-4 border-black bg-white p-12">
              <div className="text-center mb-10">
                <div className="inline-block w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-4">
                  <span className="font-heading font-bold text-2xl">?</span>
                </div>
                <h2 className="font-heading font-bold uppercase text-2xl mb-2">Contact Form</h2>
                <p className="font-body text-sm text-black/60">This is a template placeholder. Connect your API route or CMS.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-heading font-bold uppercase text-xs tracking-widest">Name</label>
                  <input type="text" placeholder="Your name" className="w-full border-2 border-black p-4 font-body bg-transparent focus:outline-none focus:border-[var(--color-accent)]" />
                </div>
                <div className="space-y-1">
                  <label className="font-heading font-bold uppercase text-xs tracking-widest">Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full border-2 border-black p-4 font-body bg-transparent focus:outline-none focus:border-[var(--color-accent)]" />
                </div>
                <div className="space-y-1">
                  <label className="font-heading font-bold uppercase text-xs tracking-widest">Message</label>
                  <textarea placeholder="Your message..." rows={5} className="w-full border-2 border-black p-4 font-body bg-transparent focus:outline-none focus:border-[var(--color-accent)] resize-none" />
                </div>
                <div className="pt-4">
                  <button className="w-full py-4 bg-black text-white font-heading font-bold uppercase hover:bg-[var(--color-accent)] transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 border-b-2 border-black">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold uppercase text-3xl mb-12">FAQ</h2>
            <div className="space-y-0 border-2 border-black">
              {[
                { q: 'How do I reskin this template?', a: 'Edit config/site.ts to change the name, colors, fonts, navigation, and content. No code changes required.' },
                { q: 'Is Sanity CMS required?', a: 'No. The template runs in static/ISR mode without Sanity. Add your project ID to enable the CMS.' },
                { q: 'How do I deploy?', a: 'Push to GitHub, connect to Vercel. Every push to main triggers a new deployment automatically.' },
                { q: 'Can I use this for client projects?', a: 'Yes. This template is MIT licensed — use it for personal projects, client work, or commercial products.' },
              ].map((faq, i) => (
                <div key={i} className="border-b-2 border-black last:border-b-0">
                  <div className="p-6 lg:p-8">
                    <h3 className="font-heading font-bold uppercase text-lg mb-3">{faq.q}</h3>
                    <p className="font-body text-black/60">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSignup source="contact" variant="banner" />
    </main>
  );
}
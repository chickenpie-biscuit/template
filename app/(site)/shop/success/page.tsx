import Link from 'next/link';
import Container from '@/components/ui/Container';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { Metadata } from 'next';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order Confirmed | Chickenpie',
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-teal border-2 border-black flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-6 text-black tracking-tight">
              Order Confirmed!
            </h1>

            <p className="font-body text-lg text-black/70 mb-4">
              Thanks for shopping with the flock. You&apos;ll receive a confirmation email shortly.
            </p>

            <p className="font-body text-sm text-black/50 mb-12">
              If you have any questions about your order, reach out to{' '}
              <a href="mailto:hello@chickenpie.co" className="text-red underline">
                hello@chickenpie.co
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-cream border-2 border-black font-heading font-bold uppercase text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cream text-black border-2 border-black font-heading font-bold uppercase text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Check Out the Feed
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSignup
        source="shop"
        variant="banner"
        heading="Stay in the Loop"
        subheading="Get notified about new drops, restocks, and exclusive offers."
      />
    </div>
  );
}

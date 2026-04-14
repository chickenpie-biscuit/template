import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { Link2, ArrowLeft, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclaimer | NXT Template',
  description: 'Disclosure about affiliate relationships and how we may earn commissions from recommendations.',
};

export default function AffiliateDisclaimerPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-black text-cream py-20 lg:py-32">
        <Container>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-cream/60 hover:text-cream transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Link2 className="w-10 h-10 text-goldenrod" />
            <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-goldenrod">
              Legal
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase leading-[0.9] mb-6">
            Affiliate Disclaimer
          </h1>
          <p className="font-body text-xl text-cream/70 max-w-2xl">
            We are the chickens of the world — and we believe in transparency.
          </p>
          <p className="font-body text-sm text-cream/40 mt-6">
            Last updated: January 23, 2026
          </p>
        </Container>
      </section>

      {/* Important Notice Banner */}
      <section className="bg-goldenrod py-6">
        <Container>
          <div className="flex items-center justify-center gap-4">
            <AlertCircle className="w-6 h-6 text-black flex-shrink-0" />
            <p className="font-heading font-bold uppercase text-sm text-black text-center">
              This site contains affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none font-body text-black/80 
              [&_h2]:font-heading [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:text-black [&_h2]:mt-12 [&_h2]:mb-6
              [&_h3]:font-heading [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-xl [&_h3]:text-black [&_h3]:mt-8 [&_h3]:mb-4
              [&_p]:mb-6 [&_p]:leading-relaxed
              [&_ul]:my-6 [&_ul]:space-y-2
              [&_li]:pl-2
              [&_a]:text-teal-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-red
              [&_strong]:text-black [&_strong]:font-bold
            ">
              <h2>1. Affiliate Disclosure</h2>
              <p>
                NXT Template (template.dev) is a participant in various affiliate marketing programs. This means that when you click on certain links on our website and make a purchase, we may receive a commission at no additional cost to you.
              </p>
              <p>
                We want to be completely transparent about our affiliate relationships. This disclosure is provided in accordance with the guidelines set by the Federal Trade Commission (FTC) and applicable Philippine consumer protection laws.
              </p>

              <h2>2. What Are Affiliate Links?</h2>
              <p>
                Affiliate links are special tracking links that allow merchants to identify that a customer came from our website. When you click on an affiliate link and make a purchase:
              </p>
              <ul>
                <li>The price you pay remains the same — you never pay extra</li>
                <li>We receive a small commission from the merchant</li>
                <li>This helps support our content creation and operations</li>
              </ul>

              <h2>3. Our Affiliate Partners</h2>
              <p>
                We may participate in affiliate programs with, but not limited to:
              </p>
              <ul>
                <li>Amazon Associates Program</li>
                <li>Software and SaaS platforms we recommend</li>
                <li>Design tools and creative software</li>
                <li>Hosting and technology services</li>
                <li>Books, courses, and educational resources</li>
                <li>Physical products and merchandise</li>
                <li>Other products and services relevant to our content</li>
              </ul>

              <h2>4. How We Choose What to Recommend</h2>
              <p>
                Our editorial integrity is paramount. We only recommend products and services that we:
              </p>
              <ul>
                <li><strong>Personally use</strong> or have thoroughly researched</li>
                <li><strong>Believe provide genuine value</strong> to our audience</li>
                <li><strong>Would recommend</strong> regardless of affiliate relationships</li>
                <li><strong>Align with our values</strong> and quality standards</li>
              </ul>
              <p>
                The presence of an affiliate link does not influence our reviews or recommendations. We maintain editorial independence and will never recommend a product solely for commission purposes.
              </p>

              <h2>5. Non-Affiliate Recommendations</h2>
              <p>
                Not all links on our website are affiliate links. We also link to:
              </p>
              <ul>
                <li>Free resources and tools</li>
                <li>Products where we have no affiliate relationship</li>
                <li>Educational content and references</li>
                <li>Other websites for informational purposes</li>
              </ul>

              <h2>6. Philippines-Specific Disclosure</h2>
              <p>
                In compliance with Philippine consumer protection laws, including the Consumer Act of the Philippines (R.A. 7394), we affirm that:
              </p>
              <ul>
                <li>All recommendations are made in good faith</li>
                <li>We do not make false or misleading claims about products</li>
                <li>Prices and availability may vary; we are not responsible for changes by merchants</li>
                <li>Your purchases are governed by the merchant&apos;s terms and policies</li>
              </ul>

              <h2>7. Your Purchases</h2>
              <p>
                When you make a purchase through our affiliate links:
              </p>
              <ul>
                <li>Your transaction is directly with the merchant, not NXT Template</li>
                <li>We do not have access to your payment information</li>
                <li>Returns, refunds, and customer service are handled by the merchant</li>
                <li>We are not responsible for product quality or merchant fulfillment</li>
              </ul>

              <h2>8. Commission Use</h2>
              <p>
                Affiliate commissions help us:
              </p>
              <ul>
                <li>Keep our content free and accessible</li>
                <li>Cover website hosting and maintenance costs</li>
                <li>Invest in creating more valuable content</li>
                <li>Support our team and creative endeavors</li>
              </ul>

              <h2>9. Identifying Affiliate Links</h2>
              <p>
                We strive to clearly identify affiliate content. You may see indicators such as:
              </p>
              <ul>
                <li>&quot;Affiliate Link&quot; labels</li>
                <li>Disclosure statements within articles</li>
                <li>&quot;We may earn a commission&quot; notes</li>
                <li>Links to this Affiliate Disclaimer page</li>
              </ul>

              <h2>10. Third-Party Content</h2>
              <p>
                Guest posts, sponsored content, and third-party contributions may also contain affiliate links. These will be clearly marked. We review all content but are not responsible for third-party claims or recommendations.
              </p>

              <h2>11. No Guarantees</h2>
              <p>
                While we recommend products we believe in, we make no guarantees regarding:
              </p>
              <ul>
                <li>Product performance or results</li>
                <li>Suitability for your specific needs</li>
                <li>Accuracy of merchant information</li>
                <li>Continued availability of products or offers</li>
              </ul>
              <p>
                Always conduct your own research before making purchasing decisions.
              </p>

              <h2>12. Updates to This Disclaimer</h2>
              <p>
                We may update this Affiliate Disclaimer as our partnerships change. The &quot;Last updated&quot; date reflects the most recent revision. We encourage you to review this page periodically.
              </p>

              <h2>13. Questions or Concerns</h2>
              <p>
                If you have questions about our affiliate relationships or this disclaimer, please contact us:
              </p>
              <p>
                <strong>NXT Template</strong><br />
                Email: <a href="mailto:hello@template.dev">hello@template.dev</a><br />
                Website: <a href="https://template.dev">template.dev</a>
              </p>

              <h2>14. Thank You</h2>
              <p>
                We sincerely appreciate your support. When you use our affiliate links, you help us continue creating content and building this community. Thank you for being part of our flock!
              </p>

              {/* Branding */}
              <div className="mt-16 pt-8 border-t-2 border-black/10 text-center">
                <p className="font-heading font-bold uppercase text-sm tracking-[0.2em] text-black/40">
                  🐔 We are the chickens of the world 🐔
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

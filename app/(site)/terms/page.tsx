import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | NXT Template',
  description: 'Terms and conditions governing your use of NXT Template services and website.',
};

export default function TermsPage() {
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
            <FileText className="w-10 h-10 text-goldenrod" />
            <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-goldenrod">
              Legal
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase leading-[0.9] mb-6">
            Terms of Service
          </h1>
          <p className="font-body text-xl text-cream/70 max-w-2xl">
            We are the chickens of the world — these terms govern our flock.
          </p>
          <p className="font-body text-sm text-cream/40 mt-6">
            Last updated: January 23, 2026
          </p>
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
              [&_ol]:my-6 [&_ol]:space-y-2
              [&_li]:pl-2
              [&_a]:text-teal-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-red
              [&_strong]:text-black [&_strong]:font-bold
            ">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the NXT Template website (template.dev) and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our services.
              </p>
              <p>
                These Terms are governed by the laws of the Republic of the Philippines, including but not limited to the Civil Code of the Philippines, the Electronic Commerce Act (R.A. 8792), and the Consumer Act of the Philippines (R.A. 7394).
              </p>

              <h2>2. Definitions</h2>
              <ul>
                <li><strong>&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;</strong> refers to NXT Template</li>
                <li><strong>&quot;User,&quot; &quot;you,&quot; &quot;your&quot;</strong> refers to individuals accessing our services</li>
                <li><strong>&quot;Services&quot;</strong> includes our website, products, content, and all related offerings</li>
                <li><strong>&quot;Content&quot;</strong> means text, images, videos, and other materials on our platform</li>
              </ul>

              <h2>3. Eligibility</h2>
              <p>
                You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into binding agreements under Philippine law.
              </p>

              <h2>4. Account Registration</h2>
              <p>
                When creating an account, you agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the confidentiality of your login credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h2>5. Products and Orders</h2>
              <h3>Product Information</h3>
              <p>
                We strive to display products accurately, but colors and images may vary due to monitor settings. Product descriptions are for informational purposes and do not constitute warranties.
              </p>

              <h3>Pricing</h3>
              <p>
                All prices are in Philippine Pesos (PHP) unless otherwise stated. Prices are subject to change without notice. We reserve the right to correct pricing errors.
              </p>

              <h3>Order Acceptance</h3>
              <p>
                Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. An order confirmation does not guarantee acceptance until the product is shipped.
              </p>

              <h2>6. Payment Terms</h2>
              <p>
                We accept various payment methods as displayed during checkout. By submitting payment information, you authorize us to charge the applicable amounts. All transactions are processed securely through third-party payment processors.
              </p>
              <p>
                In accordance with the Consumer Act of the Philippines, all prices include applicable taxes unless otherwise stated.
              </p>

              <h2>7. Shipping and Delivery</h2>
              <p>
                Shipping times and costs vary based on location and shipping method selected. We are not responsible for delays caused by shipping carriers, customs, or circumstances beyond our control. Risk of loss passes to you upon delivery to the carrier.
              </p>

              <h2>8. Returns and Refunds</h2>
              <p>
                Our return policy complies with the Consumer Act of the Philippines:
              </p>
              <ul>
                <li>Defective products may be returned within 30 days for replacement or refund</li>
                <li>Products must be unused and in original packaging for non-defective returns</li>
                <li>Digital products are non-refundable once downloaded or accessed</li>
                <li>Refunds will be processed within 14 business days of approval</li>
              </ul>

              <h2>9. Intellectual Property</h2>
              <p>
                All content on our website, including but not limited to text, graphics, logos, images, designs, and software, is the property of NXT Template and protected by Philippine intellectual property laws (Intellectual Property Code, R.A. 8293) and international treaties.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>

              <h2>10. User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property or privacy rights</li>
                <li>Transmit harmful, offensive, or illegal content</li>
                <li>Interfere with the operation of our services</li>
                <li>Attempt unauthorized access to our systems</li>
                <li>Use automated systems to access our services without permission</li>
                <li>Engage in fraudulent activities</li>
              </ul>

              <h2>11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by Philippine law:
              </p>
              <ul>
                <li>Our services are provided &quot;as is&quot; without warranties of any kind</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount paid for the specific product or service</li>
                <li>We are not liable for third-party actions or services</li>
              </ul>

              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless NXT Template, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your violation of these Terms or misuse of our services.
              </p>

              <h2>13. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of these external sites. Accessing them is at your own risk.
              </p>

              <h2>14. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes become effective upon posting. Continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>

              <h2>15. Termination</h2>
              <p>
                We may terminate or suspend your access to our services at our discretion, without notice, for conduct that violates these Terms or is harmful to other users, us, or third parties.
              </p>

              <h2>16. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of the Republic of the Philippines. Any disputes shall be resolved through:
              </p>
              <ol>
                <li><strong>Negotiation:</strong> Good faith discussion between parties</li>
                <li><strong>Mediation:</strong> Through a mutually agreed mediator</li>
                <li><strong>Arbitration:</strong> Under the Alternative Dispute Resolution Act (R.A. 9285) if mediation fails</li>
                <li><strong>Litigation:</strong> Courts of competent jurisdiction in the Philippines</li>
              </ol>

              <h2>17. Severability</h2>
              <p>
                If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h2>18. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy and any other legal notices on our website, constitute the entire agreement between you and NXT Template.
              </p>

              <h2>19. Contact Information</h2>
              <p>
                For questions about these Terms, contact us at:
              </p>
              <p>
                <strong>NXT Template</strong><br />
                Email: <a href="mailto:legal@template.dev">legal@template.dev</a><br />
                Website: <a href="https://template.dev">template.dev</a>
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

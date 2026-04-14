import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | NXT Template',
  description: 'Our commitment to protecting your privacy and personal data under the Data Privacy Act of 2012 (Philippines).',
};

export default function PrivacyPage() {
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
            <Shield className="w-10 h-10 text-goldenrod" />
            <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-goldenrod">
              Legal
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase leading-[0.9] mb-6">
            Privacy Policy
          </h1>
          <p className="font-body text-xl text-cream/70 max-w-2xl">
            We are the chickens of the world — and we take your privacy seriously.
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
              [&_li]:pl-2
              [&_a]:text-teal-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-red
              [&_strong]:text-black [&_strong]:font-bold
            ">
              <h2>1. Introduction</h2>
              <p>
                NXT Template (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website template.dev and use our services.
              </p>
              <p>
                We operate in compliance with the <strong>Data Privacy Act of 2012</strong> (Republic Act No. 10173) of the Philippines and its Implementing Rules and Regulations (IRR), as well as applicable international data protection standards.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Personal Information You Provide</h3>
              <p>We may collect personal information that you voluntarily provide, including:</p>
              <ul>
                <li>Name and contact information (email address, phone number)</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials</li>
                <li>Communications and correspondence with us</li>
                <li>Survey responses and feedback</li>
              </ul>

              <h3>Information Automatically Collected</h3>
              <p>When you access our website, we may automatically collect:</p>
              <ul>
                <li>Device information (browser type, operating system)</li>
                <li>IP address and approximate location</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about products, services, and promotions</li>
                <li>Improve our website and user experience</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>

              <h2>4. Legal Basis for Processing (Philippines)</h2>
              <p>
                Under the Data Privacy Act of 2012, we process your personal data based on:
              </p>
              <ul>
                <li><strong>Consent:</strong> When you provide explicit consent for specific purposes</li>
                <li><strong>Contractual Necessity:</strong> To fulfill orders and provide requested services</li>
                <li><strong>Legitimate Interest:</strong> For business operations that don&apos;t override your rights</li>
                <li><strong>Legal Obligation:</strong> To comply with Philippine laws and regulations</li>
              </ul>

              <h2>5. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Payment processors, shipping companies, email services</li>
                <li><strong>Business Partners:</strong> With your consent, for joint offerings</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Affiliates:</strong> Companies under common ownership for operational purposes</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>

              <h2>6. Your Rights Under Philippine Law</h2>
              <p>
                Under the Data Privacy Act of 2012, you have the following rights:
              </p>
              <ul>
                <li><strong>Right to Be Informed:</strong> Know how your data is being processed</li>
                <li><strong>Right to Access:</strong> Obtain a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Oppose processing based on legitimate interests</li>
                <li><strong>Right to File a Complaint:</strong> Lodge complaints with the National Privacy Commission (NPC)</li>
              </ul>

              <h2>7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              <ul>
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through PCI-compliant providers</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
              </ul>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements. When no longer needed, data is securely deleted or anonymized.
              </p>

              <h2>9. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience. You can control cookie preferences through your browser settings. Some cookies are essential for website functionality.
              </p>

              <h2>10. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside the Philippines. We ensure appropriate safeguards are in place as required by the Data Privacy Act and NPC guidelines.
              </p>

              <h2>11. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal data from minors. If we become aware of such collection, we will delete the information promptly.
              </p>

              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. We encourage you to review this policy regularly.
              </p>

              <h2>13. Contact Us</h2>
              <p>
                For questions about this Privacy Policy or to exercise your rights, contact us at:
              </p>
              <p>
                <strong>NXT Template</strong><br />
                Email: <a href="mailto:privacy@template.dev">privacy@template.dev</a><br />
                Data Protection Officer: <a href="mailto:dpo@template.dev">dpo@template.dev</a>
              </p>
              <p>
                You may also file a complaint with the <strong>National Privacy Commission</strong> of the Philippines at <a href="https://www.privacy.gov.ph" target="_blank" rel="noopener noreferrer">www.privacy.gov.ph</a>.
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

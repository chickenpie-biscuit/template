import ContactForm from '@/components/ui/ContactForm';
import FAQSection from '@/components/ui/FAQSection';
import NewsletterSignup from '@/components/ui/NewsletterSignup';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <ContactForm />
      <NewsletterSignup source="contact" variant="banner" />
      <FAQSection />
    </div>
  );
}

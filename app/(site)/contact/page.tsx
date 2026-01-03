import Container from '@/components/ui/Container';
import ContactForm from '@/components/ui/ContactForm';
import FAQSection from '@/components/ui/FAQSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <ContactForm />
      <FAQSection />
    </div>
  );
}


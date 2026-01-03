import Container from '@/components/ui/Container';
import ContactForm from '@/components/ui/ContactForm';
import FAQSection from '@/components/ui/FAQSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="py-20 lg:py-32 bg-cream border-b-2 border-black">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-6 text-black text-center">
              Get in Touch
            </h1>
            <p className="font-body text-lg text-black/80 text-center mb-12">
              Have a project in mind? A question about our shop? Just want to say hi? We would
              love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      <ContactForm />

      <section className="py-16 bg-cream border-b-2 border-black">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold uppercase text-black">
              Alternative Contact Methods
            </h2>
            <div className="space-y-4 font-body">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:hello@chickenpie.co"
                  className="text-red-200 hover:underline"
                >
                  hello@chickenpie.co
                </a>
              </p>
              <p>
                <strong>Instagram:</strong>{' '}
                <a
                  href="https://instagram.com/chickenpie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-200 hover:underline"
                >
                  @chickenpie
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <FAQSection />
    </div>
  );
}


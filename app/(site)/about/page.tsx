import Container from '@/components/ui/Container';
import AboutHero from '@/components/ui/AboutHero';
import BrandStory from '@/components/ui/BrandStory';
import ValuesSection from '@/components/ui/ValuesSection';
import CTASection from '@/components/ui/CTASection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <AboutHero />
      <BrandStory />
      <ValuesSection />
      <CTASection />
    </div>
  );
}


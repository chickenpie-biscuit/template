import { Metadata } from 'next';
import AboutHero from '@/components/ui/AboutHero';
import BrandStory from '@/components/ui/BrandStory';
import ValuesSection from '@/components/ui/ValuesSection';
import TeamSection from '@/components/ui/TeamSection';
import CTASection from '@/components/ui/CTASection';

export const metadata: Metadata = {
  title: 'About | Chickenpie',
  description: 'Learn about Chickenpie - a creative universe spreading love, chickens & art',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <AboutHero />
      <BrandStory />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}

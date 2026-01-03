import { client } from '@/sanity/lib/client';
import { getAllStudioProjects, getFeaturedStudioProjects } from '@/sanity/lib/queries';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import StudioHero from '@/components/ui/StudioHero';
import ServicesSection from '@/components/ui/ServicesSection';
import PortfolioGrid from '@/components/ui/PortfolioGrid';
import ProcessSection from '@/components/ui/ProcessSection';

export const revalidate = 60;

export default async function StudioPage() {
  const [allProjects, featuredProjects] = await Promise.all([
    client?.fetch(getAllStudioProjects).catch(() => []) ?? [],
    client?.fetch(getFeaturedStudioProjects).catch(() => []) ?? [],
  ]);

  return (
    <div className="min-h-screen bg-cream">
      <StudioHero featuredProjects={featuredProjects} />
      <ServicesSection />
      <PortfolioGrid projects={allProjects} />
      <ProcessSection />
      <div className="bg-red-200 border-t-2 border-black">
        <Container>
          <div className="py-16 text-center">
            <h2 className="text-4xl font-heading font-bold uppercase mb-4 text-black">
              Ready to start?
            </h2>
            <p className="font-body text-lg mb-8 text-black/80">
              Let's create something amazing together
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:bg-black/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}


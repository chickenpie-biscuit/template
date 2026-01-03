import { client } from '@/sanity/lib/client';
import { getAllStudioProjects } from '@/sanity/lib/queries';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import StudioHero from '@/components/ui/StudioHero';
import PortfolioGrid from '@/components/ui/PortfolioGrid';

export const revalidate = 60;

export default async function StudioPage() {
  const allProjects = await client?.fetch(getAllStudioProjects).catch(() => []) ?? [];

  return (
    <div className="min-h-screen bg-cream">
      <StudioHero />
      <PortfolioGrid projects={allProjects} />
      
      <div className="bg-cream border-t-2 border-black py-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-8 text-black leading-tight">
              Have an idea?
            </h2>
            <p className="font-body text-xl lg:text-2xl text-black/60 mb-12 max-w-2xl mx-auto">
              We are always looking for new challenges and interesting collaborations.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 bg-black text-cream border-2 border-black font-heading font-bold uppercase text-lg hover:bg-transparent hover:text-black transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}


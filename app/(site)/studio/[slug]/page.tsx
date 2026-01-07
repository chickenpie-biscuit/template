import { client } from '@/sanity/lib/client';
import { getStudioProjectBySlug } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Target, Lightbulb, TrendingUp, ExternalLink } from 'lucide-react';

interface StudioProjectPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export default async function StudioProjectPage({ params }: StudioProjectPageProps) {
  const project = await client
    ?.fetch(getStudioProjectBySlug, { slug: params.slug })
    .catch(() => null);

  if (!project) {
    notFound();
  }

  const featuredImageUrl = project.featuredImage
    ? urlFor(project.featuredImage).width(1600).height(1200).url()
    : null;

  const categoryLabels: Record<string, string> = {
    branding: 'Branding & Identity',
    web: 'Web Design & Development',
    illustration: 'Illustration & Art',
  };

  const categoryLabel = categoryLabels[project.category] || project.category;

  return (
    <article className="min-h-screen bg-cream">
      {/* Editorial Hero - Full Width Parallax Effect */}
      {featuredImageUrl && (
        <div className="relative w-full h-[85vh] overflow-hidden">
          <div className="fixed top-0 left-0 w-full h-full -z-10">
             <Image
              src={featuredImageUrl}
              alt={project.featuredImage?.alt || project.title}
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* Hero Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-20 text-cream">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-4 py-2 text-xs font-heading font-bold uppercase tracking-widest border border-cream/30 bg-black/20 backdrop-blur-md mb-6">
                {categoryLabel}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold uppercase leading-[0.85] tracking-tight mb-8">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Content Layout */}
      <div className="bg-cream relative z-10">
        <Container>
          <div className="py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Sticky Sidebar Info */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-8 border-t-2 border-black pt-8">
                  {project.client && (
                    <div>
                      <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-black/40 mb-2">Client</h3>
                      <p className="text-xl font-heading font-bold uppercase">{project.client}</p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-black/40 mb-2">Year</h3>
                      <p className="text-xl font-heading font-bold uppercase">{project.year}</p>
                    </div>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-black/40 mb-2">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string, index: number) => (
                          <span key={index} className="text-lg font-heading font-bold uppercase">
                            {tag}{index < project.tags.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {project.description && (
                  <div className="pt-8 border-t-2 border-black">
                    <p className="text-lg font-body leading-relaxed text-black/80">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-8 space-y-20">
              {/* Challenge & Solution */}
              {(project.projectChallenge || project.projectSolution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.projectChallenge && (
                    <div className="border-4 border-black p-8 lg:p-10 bg-white">
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="w-8 h-8 text-red" />
                        <h2 className="font-heading font-bold uppercase text-2xl">The Challenge</h2>
                      </div>
                      <p className="text-lg text-black/80 leading-relaxed font-body">
                        {project.projectChallenge}
                      </p>
                    </div>
                  )}

                  {project.projectSolution && (
                    <div className="border-4 border-black p-8 lg:p-10 bg-goldenrod">
                      <div className="flex items-center gap-3 mb-6">
                        <Lightbulb className="w-8 h-8 text-black" />
                        <h2 className="font-heading font-bold uppercase text-2xl text-black">The Solution</h2>
                      </div>
                      <p className="text-lg text-black leading-relaxed font-body">
                        {project.projectSolution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {project.caseStudy && (
                <div className="prose prose-xl prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-p:font-body prose-p:text-black/80 max-w-none">
                  <PortableText content={project.caseStudy} />
                </div>
              )}

              {/* Immersive Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-20">
                  <h2 className="font-heading font-bold uppercase text-4xl mb-8 flex items-center gap-3">
                    <span className="w-1 h-12 bg-goldenrod" />
                    Project Gallery
                  </h2>
                  {project.gallery.map((image: any, index: number) => {
                    const imageUrl = urlFor(image).width(1600).height(1200).url();
                    // Alternate layouts for visual interest
                    const isFullWidth = index % 3 === 0;
                    
                    return (
                      <div
                        key={index}
                        className={`relative ${isFullWidth ? 'aspect-[16/9] -mx-4 md:-mx-12 lg:-mx-20 w-[calc(100%+2rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)]' : 'aspect-[4/3]'} bg-black overflow-hidden group border-2 border-black`}
                      >
                        <Image
                          src={imageUrl}
                          alt={image.alt || `Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Results & Impact */}
              {project.projectResults && project.projectResults.length > 0 && (
                <div className="bg-black text-cream p-10 lg:p-14 border-4 border-black">
                  <div className="flex items-center gap-3 mb-8">
                    <TrendingUp className="w-8 h-8 text-goldenrod" />
                    <h2 className="font-heading font-bold uppercase text-3xl">Results & Impact</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.projectResults.map((result: string, index: number) => (
                      <div key={index} className="border-2 border-goldenrod p-6 bg-black/50">
                        <p className="font-heading text-lg font-bold text-goldenrod">
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}

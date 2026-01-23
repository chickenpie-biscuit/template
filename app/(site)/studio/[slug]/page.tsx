import { client } from '@/sanity/lib/client';
import { getStudioProjectBySlug, getAllStudioProjects } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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

  // Get all projects for navigation
  const allProjects = await client?.fetch(getAllStudioProjects).catch(() => []) ?? [];
  const currentIndex = allProjects.findIndex((p: any) => p.slug === params.slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  const featuredImageUrl = project.featuredImage
    ? urlFor(project.featuredImage).width(1920).height(1080).url()
    : null;

  const categoryLabels: Record<string, string> = {
    branding: 'Branding & Identity',
    web: 'Web Design & Development',
    illustration: 'Illustration & Art Direction',
    'design-work': 'Design Work',
  };

  const categoryLabel = categoryLabels[project.category] || project.category;

  return (
    <article className="min-h-screen bg-cream">
      {/* Navigation Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-black/10">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <Link
              href="/studio"
              className="flex items-center gap-3 font-heading font-bold uppercase text-sm tracking-wider text-black/60 hover:text-black transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>
            <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-black/40">
              {categoryLabel}
            </span>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-32 border-b border-black/10">
        <Container>
          <div className="max-w-6xl">
            {/* Project Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase leading-[0.9] tracking-tight text-black mb-12">
              {project.title}
            </h1>

            {/* Project Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-8 border-t border-black/10">
              {project.client && (
                <div>
                  <h3 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-black/40 mb-2">
                    Client
                  </h3>
                  <p className="text-lg font-heading font-bold text-black">
                    {project.client}
                  </p>
                </div>
              )}
              {project.year && (
                <div>
                  <h3 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-black/40 mb-2">
                    Year
                  </h3>
                  <p className="text-lg font-heading font-bold text-black">
                    {project.year}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-black/40 mb-2">
                  Category
                </h3>
                <p className="text-lg font-heading font-bold text-black">
                  {categoryLabel}
                </p>
              </div>
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-black/40 mb-2">
                    Services
                  </h3>
                  <p className="text-lg font-heading font-bold text-black">
                    {project.tags.slice(0, 2).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image - Full Width */}
      {featuredImageUrl && (
        <section className="relative bg-cream">
          <div className="min-h-[50vh] lg:min-h-[70vh] w-full relative overflow-hidden flex items-center justify-center py-8">
            <Image
              src={featuredImageUrl}
              alt={project.featuredImage?.alt || project.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </section>
      )}

      {/* Project Overview */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Overview Label */}
            <div className="lg:col-span-3">
              <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-black/40 sticky top-40">
                Overview
              </h2>
            </div>

            {/* Description */}
            <div className="lg:col-span-9">
              {project.description && (
                <p className="text-2xl lg:text-3xl font-body leading-relaxed text-black/80">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Challenge & Solution */}
      {(project.projectChallenge || project.projectSolution) && (
        <section className="py-20 lg:py-32 bg-black text-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {project.projectChallenge && (
                <div>
                  <h3 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-cream/40 mb-8">
                    The Challenge
                  </h3>
                  <p className="text-xl lg:text-2xl font-body leading-relaxed text-cream/90">
                    {project.projectChallenge}
                  </p>
                </div>
              )}
              {project.projectSolution && (
                <div>
                  <h3 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-cream/40 mb-8">
                    The Solution
                  </h3>
                  <p className="text-xl lg:text-2xl font-body leading-relaxed text-cream/90">
                    {project.projectSolution}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 lg:py-32">
          <Container>
            <div className="space-y-8 lg:space-y-16">
              {project.gallery.map((image: any, index: number) => {
                const imageUrl = urlFor(image).width(1920).url();
                // Create varied layouts
                const isFullWidth = index === 0 || index % 4 === 0;
                const isHalf = !isFullWidth && (index % 4 === 1 || index % 4 === 2);
                
                if (isFullWidth) {
                  return (
                    <div
                      key={index}
                      className="min-h-[400px] lg:min-h-[600px] w-full relative overflow-hidden bg-cream"
                    >
                      <Image
                        src={imageUrl}
                        alt={image.alt || `${project.title} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  );
                }

                // For half-width images, we need to handle pairs
                if (isHalf && index % 4 === 1) {
                  const nextImage = project.gallery[index + 1];
                  const nextImageUrl = nextImage
                    ? urlFor(nextImage).width(960).url()
                    : null;

                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                      <div className="min-h-[300px] lg:min-h-[400px] relative overflow-hidden bg-cream">
                        <Image
                          src={imageUrl}
                          alt={image.alt || `${project.title} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {nextImageUrl && (
                        <div className="min-h-[300px] lg:min-h-[400px] relative overflow-hidden bg-cream">
                          <Image
                            src={nextImageUrl}
                            alt={nextImage.alt || `${project.title} - Image ${index + 2}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                // Skip images that were already rendered as part of a pair
                if (isHalf && index % 4 === 2) {
                  return null;
                }

                return (
                  <div
                    key={index}
                    className="min-h-[400px] lg:min-h-[600px] w-full relative overflow-hidden bg-cream"
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alt || `${project.title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Case Study Content */}
      {project.caseStudy && (
        <section className="py-20 lg:py-32 border-t border-black/10">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-3">
                <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-black/40 sticky top-40">
                  Case Study
                </h2>
              </div>
              <div className="lg:col-span-9">
                <div className="
                  font-body text-lg text-black/80 leading-relaxed max-w-3xl
                  [&_h1]:font-heading [&_h1]:font-bold [&_h1]:uppercase [&_h1]:text-3xl [&_h1]:text-black [&_h1]:mt-16 [&_h1]:mb-6
                  [&_h2]:font-heading [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:text-black [&_h2]:mt-12 [&_h2]:mb-6
                  [&_h3]:font-heading [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-xl [&_h3]:text-black [&_h3]:mt-10 [&_h3]:mb-4
                  [&_p]:mb-6 [&_p]:leading-relaxed
                  [&_a]:text-black [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-black/60
                  [&_strong]:text-black [&_strong]:font-bold
                  [&_blockquote]:border-l-2 [&_blockquote]:border-black [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-black/70
                  [&_ul]:my-6 [&_ul]:space-y-2
                  [&_ol]:my-6 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside
                  [&_li]:text-black/80
                ">
                  <PortableText content={project.caseStudy} />
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Results */}
      {project.projectResults && project.projectResults.length > 0 && (
        <section className="py-20 lg:py-32 bg-black text-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-3">
                <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-cream/40">
                  Results
                </h2>
              </div>
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.projectResults.map((result: string, index: number) => (
                    <div
                      key={index}
                      className="border-t border-cream/20 pt-6"
                    >
                      <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-cream/40 mb-4 block">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-lg font-body leading-relaxed text-cream/90">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Next Project */}
      {nextProject && nextProject.slug !== params.slug && (
        <section className="border-t border-black/10">
          <Link href={`/studio/${nextProject.slug}`} className="group block">
            <div className="py-20 lg:py-32 hover:bg-black hover:text-cream transition-colors duration-500">
              <Container>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div>
                    <span className="text-xs font-heading font-bold uppercase tracking-[0.3em] opacity-40 mb-4 block">
                      Next Project
                    </span>
                    <h3 className="text-4xl lg:text-6xl font-heading font-bold uppercase leading-[0.9]">
                      {nextProject.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-20px] group-hover:translate-x-0">
                    <span className="font-heading font-bold uppercase tracking-wider text-sm">
                      View Project
                    </span>
                    <div className="w-14 h-14 border-2 border-current flex items-center justify-center bg-cream text-black group-hover:bg-cream group-hover:text-black">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </Link>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-20 lg:py-32 bg-cream border-t border-black/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-8 text-black leading-tight">
              Let&apos;s work together
            </h2>
            <p className="font-body text-xl text-black/60 mb-12">
              Have a project in mind? We&apos;d love to hear about it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-cream border-2 border-black font-heading font-bold uppercase text-lg hover:bg-transparent hover:text-black transition-colors"
            >
              Start a Conversation
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}

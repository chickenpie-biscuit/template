import { client } from '@/sanity/lib/client';
import { getStudioProjectBySlug } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

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
    ? urlFor(project.featuredImage).width(1200).height(800).url()
    : null;

  const categoryLabels: Record<string, string> = {
    branding: 'Branding & Identity',
    web: 'Web Design & Development',
    illustration: 'Illustration & Art',
  };

  const categoryLabel = categoryLabels[project.category] || project.category;

  return (
    <article className="min-h-screen bg-cream">
      {/* Hero Image */}
      {featuredImageUrl && (
        <div className="relative w-full h-[60vh] bg-black border-b-2 border-black">
          <Image
            src={featuredImageUrl}
            alt={project.featuredImage?.alt || project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <Container>
        <div className="py-12 max-w-4xl mx-auto">
          {/* Header Info */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 text-sm font-heading font-bold uppercase tracking-wide border-2 border-black bg-red-200 text-red-300 mb-4">
              {categoryLabel}
            </span>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-4 text-black">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 font-body text-black/60">
              {project.year && <span>Year: {project.year}</span>}
              {project.client && <span>Client: {project.client}</span>}
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-xl font-body text-black/80 mb-12">{project.description}</p>
          )}

          {/* Case Study Content */}
          {project.caseStudy && (
            <div className="mb-12">
              <PortableText content={project.caseStudy} />
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {project.gallery.map((image: any, index: number) => {
                const imageUrl = urlFor(image).width(800).height(600).url();
                return (
                  <div
                    key={index}
                    className="relative aspect-[4/3] bg-black border-2 border-black overflow-hidden"
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-heading font-bold uppercase bg-cream-200 text-black border border-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}


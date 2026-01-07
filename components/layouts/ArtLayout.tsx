'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface ArtLayoutProps {
  post: any;
}

export default function ArtLayout({ post }: ArtLayoutProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1600).height(1200).url()
    : null;

  return (
    <article className="min-h-screen bg-cream">
      <Container>
        <div className="py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Gallery Image (Matte effect) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-white p-8 md:p-12 shadow-2xl relative flex items-center justify-center h-[70vh] w-full">
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={post.featuredImage?.alt || post.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] w-full bg-cream-200 flex items-center justify-center">
                  <span className="font-heading text-black/20 uppercase">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-32">
              <span className="inline-block px-3 py-1 text-xs font-heading font-bold uppercase tracking-widest border border-black mb-6">
                Original Art
              </span>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-8 leading-none">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-lg font-body text-black/80 mb-8 leading-relaxed">
                  {post.description}
                </p>
              )}

              {post.body && (
                <div className="prose prose-sm max-w-none font-body text-black/60 mb-8">
                  <PortableText content={post.body} />
                </div>
              )}

              {/* Purchase CTA if available */}
              {post.ctaLink && (
                <a
                  href={post.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-4 bg-black text-cream font-heading font-bold uppercase text-center hover:bg-red-200 hover:text-black transition-colors border-2 border-black"
                >
                  {post.ctaText || 'Purchase / Inquire'}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}


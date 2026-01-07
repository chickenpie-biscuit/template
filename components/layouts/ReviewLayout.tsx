'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface ReviewLayoutProps {
  post: any;
}

export default function ReviewLayout({ post }: ReviewLayoutProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(800).url()
    : null;

  return (
    <article className="min-h-screen bg-cream">
      <Container>
        <div className="py-20 lg:py-32 max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white border-2 border-black p-8 md:p-12 mb-12 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute -top-4 -right-4 bg-red-200 border-2 border-black px-6 py-2 rotate-3">
              <span className="font-heading font-bold uppercase text-sm">
                Chickenpie Finds
              </span>
            </div>

            <span className="block font-heading font-bold uppercase text-xs tracking-widest text-black/40 mb-4">
              Review / Recommendation
            </span>
            
            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-8 leading-none">
              {post.title}
            </h1>

            {imageUrl && (
              <div className="relative w-full aspect-video border-2 border-black mb-8 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.featuredImage?.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-t-2 border-black/10 pt-8">
              <div>
                <p className="font-heading font-bold uppercase text-xs text-black/40 mb-1">
                  Price / Value
                </p>
                <p className="text-3xl font-heading font-bold text-black">
                  {post.findPrice || 'Priceless'}
                </p>
              </div>
              
              {post.ctaLink && (
                <a
                  href={post.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-black text-cream font-heading font-bold uppercase hover:bg-red-200 hover:text-black transition-colors border-2 border-black"
                >
                  {post.ctaText || 'Check it out'}
                </a>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="prose prose-lg lg:prose-xl font-body text-black/80 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase">
            <p className="lead text-2xl font-body text-black mb-8">
              {post.description}
            </p>
            {post.body && <PortableText content={post.body} />}
          </div>
        </div>
      </Container>
    </article>
  );
}


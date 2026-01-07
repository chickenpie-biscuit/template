'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface BlogLayoutProps {
  post: any;
}

export default function BlogLayout({ post }: BlogLayoutProps) {
  // Use mainImage (standard post) or featuredImage (feedPost)
  const image = post.mainImage || post.featuredImage;
  const imageUrl = image
    ? urlFor(image).width(1200).height(600).url()
    : null;

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article className="min-h-screen bg-cream">
      <div className="pt-32 pb-12 lg:pt-48 lg:pb-24 border-b-2 border-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="font-heading font-bold uppercase text-xs tracking-widest text-black/40">
                {post.category || 'Journal'}
              </span>
              <span className="w-1 h-1 bg-black rounded-full" />
              <span className="font-heading font-bold uppercase text-xs tracking-widest text-black/40">
                {date}
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-8 leading-[0.9]">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl lg:text-2xl font-body text-black/60 leading-relaxed max-w-2xl mx-auto">
                {post.description}
              </p>
            )}
          </div>
        </Container>
      </div>

      {imageUrl && (
        <div className="relative w-full h-[50vh] lg:h-[70vh] border-b-2 border-black overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <Container>
        <div className="py-20 lg:py-32 max-w-3xl mx-auto">
          {post.body && (
            <div className="prose prose-lg lg:prose-xl font-body text-black/80 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-a:text-red-200 hover:prose-a:text-red-300">
              <PortableText content={post.body} />
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}


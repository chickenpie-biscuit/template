'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Star, ThumbsUp, ThumbsDown, ExternalLink, Wrench } from 'lucide-react';

interface ToolTuesdayLayoutProps {
  post: any;
}

export default function ToolTuesdayLayout({ post }: ToolTuesdayLayoutProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(800).url()
    : null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating
            ? 'fill-goldenrod text-goldenrod'
            : 'text-black/20'
        }`}
      />
    ));
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-teal border-b-4 border-black">
        <Container>
          <div className="py-8 flex items-center gap-4">
            <Wrench className="w-8 h-8 text-black" />
            <div>
              <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-black block">
                Tool Tuesday
              </span>
              <p className="font-body text-sm text-black/70 mt-1">
                Tools that actually work
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24">
          {/* Tool Card */}
          <div className="max-w-5xl mx-auto bg-cream border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            {/* Tool Header */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-12">
              {/* Tool Image */}
              <div className="lg:col-span-2">
                {imageUrl ? (
                  <div className="relative w-full aspect-square bg-white border-2 border-black overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.toolName || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-black/5 border-2 border-black flex items-center justify-center">
                    <Wrench className="w-20 h-20 text-black/20" />
                  </div>
                )}
              </div>

              {/* Tool Info */}
              <div className="lg:col-span-3">
                <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-4 leading-none">
                  {post.toolName || post.title}
                </h1>

                {post.description && (
                  <p className="text-xl font-body text-black/70 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                )}

                {/* Rating */}
                {post.toolRating && typeof post.toolRating === 'number' && (
                  <div className="mb-6">
                    <p className="font-heading text-xs uppercase tracking-widest text-black/60 mb-2">
                      My Rating
                    </p>
                    <div className="flex items-center gap-1">
                      {renderStars(post.toolRating)}
                      <span className="ml-3 font-heading text-2xl font-bold">
                        {post.toolRating}/5
                      </span>
                    </div>
                  </div>
                )}

                {/* Price */}
                {post.toolPrice && typeof post.toolPrice === 'string' && (
                  <div className="inline-block px-6 py-3 bg-goldenrod border-2 border-black font-heading text-2xl font-bold mb-6">
                    {post.toolPrice}
                  </div>
                )}

                {/* CTA Button */}
                {post.toolWebsite && typeof post.toolWebsite === 'string' && (
                  <div className="mt-6">
                    <a
                      href={post.toolWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-black text-cream hover:bg-teal hover:text-black transition-colors border-2 border-black font-heading font-bold uppercase text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all"
                    >
                      Try {typeof post.toolName === 'string' ? post.toolName : 'Tool'}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Pros & Cons */}
            {(post.toolPros?.length > 0 || post.toolCons?.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 border-t-4 border-black">
                {/* Pros */}
                {post.toolPros?.length > 0 && (
                  <div className="p-8 lg:p-12 border-r-0 lg:border-r-4 border-black">
                    <div className="flex items-center gap-3 mb-6">
                      <ThumbsUp className="w-6 h-6 text-teal" />
                      <h2 className="font-heading font-bold uppercase text-2xl">
                        Pros
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {post.toolPros.map((pro: any, i: number) => (
                        typeof pro === 'string' && (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                            <span className="font-body text-lg text-black/80">{pro}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {post.toolCons?.length > 0 && (
                  <div className="p-8 lg:p-12 border-t-4 lg:border-t-0 border-black">
                    <div className="flex items-center gap-3 mb-6">
                      <ThumbsDown className="w-6 h-6 text-red" />
                      <h2 className="font-heading font-bold uppercase text-2xl">
                        Cons
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {post.toolCons.map((con: any, i: number) => (
                        typeof con === 'string' && (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-red rounded-full mt-2 flex-shrink-0" />
                            <span className="font-body text-lg text-black/80">{con}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* My Experience */}
            {post.body && (
              <div className="p-8 lg:p-12 border-t-4 border-black bg-white">
                <h2 className="font-heading font-bold uppercase text-3xl mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-teal" />
                  My Experience
                </h2>
                <div className="prose prose-lg max-w-none font-body text-black/80
                  prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase
                  prose-a:text-teal prose-a:font-bold hover:prose-a:underline
                  prose-strong:text-black prose-strong:font-bold">
                  <PortableText content={post.body} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}


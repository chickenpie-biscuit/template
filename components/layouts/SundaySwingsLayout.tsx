'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Coffee, Clock } from 'lucide-react';

interface SundaySwingsLayoutProps {
  post: any;
}

export default function SundaySwingsLayout({ post }: SundaySwingsLayoutProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1600).url()
    : null;

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = () => {
    if (!post.body) return null;
    const wordCount = JSON.stringify(post.body).split(' ').length;
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
  };

  const readingTime = getReadingTime();

  return (
    <article className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="border-b border-black/10">
        <Container>
          <div className="py-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Coffee className="w-6 h-6 text-goldenrod" />
              <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-black/60">
                Sunday Swings
              </span>
            </div>
            {post.publishedAt && (
              <time className="font-body text-sm text-black/50">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>
        </Container>
      </div>

      {/* Hero Image (Optional) */}
      {imageUrl && (
        <div className="relative w-full h-[60vh] lg:h-[70vh] bg-cream-100">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      )}

      <Container>
        <div className={`${imageUrl ? '-mt-32 relative z-10' : 'pt-16'} pb-24`}>
          <div className="max-w-3xl mx-auto">
            {/* Title Section */}
            <div className="bg-white px-8 lg:px-12 py-12 mb-12">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8 text-black">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-2xl lg:text-3xl font-body italic text-black/70 leading-relaxed mb-8 border-l-4 border-goldenrod pl-6">
                  {post.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-6 text-black/50">
                {readingTime && (
                  <div className="flex items-center gap-2 font-body text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                )}
                <div className="w-1 h-1 bg-black/20 rounded-full" />
                <span className="font-body text-sm">
                  Reflection · Essay
                </span>
              </div>
            </div>

            {/* Drop Cap & Content */}
            {post.body && (
              <div className="bg-white px-8 lg:px-12 py-12">
                <div className="prose prose-xl max-w-none font-body
                  prose-p:text-black/80 prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-black prose-headings:mt-16 prose-headings:mb-6
                  prose-h2:text-4xl prose-h2:uppercase prose-h2:tracking-tight
                  prose-h3:text-3xl prose-h3:uppercase
                  prose-a:text-goldenrod prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4
                  prose-strong:text-black prose-strong:font-bold
                  prose-em:italic prose-em:text-black/70
                  prose-blockquote:border-l-4 prose-blockquote:border-goldenrod prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-2xl prose-blockquote:font-heading prose-blockquote:text-black/80
                  prose-ul:space-y-3 prose-ul:text-black/80
                  prose-ol:space-y-3 prose-ol:text-black/80
                  prose-li:text-lg
                  prose-hr:border-black/10 prose-hr:my-16
                  prose-img:rounded-sm prose-img:shadow-lg">
                  
                  {/* Drop Cap Effect - First Letter */}
                  <style jsx global>{`
                    .sunday-swings-content > p:first-of-type::first-letter {
                      font-family: var(--font-heading);
                      float: left;
                      font-size: 5.5rem;
                      line-height: 0.85;
                      padding-right: 0.5rem;
                      padding-top: 0.25rem;
                      font-weight: bold;
                      color: var(--color-goldenrod, #DAA520);
                    }
                  `}</style>

                  <div className="sunday-swings-content">
                    <PortableText content={post.body} />
                  </div>
                </div>

                {/* End Mark */}
                <div className="mt-16 pt-8 border-t border-black/10 text-center">
                  <div className="inline-flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-goldenrod" />
                    <span className="font-heading text-3xl text-goldenrod">◆</span>
                    <div className="w-12 h-0.5 bg-goldenrod" />
                  </div>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-12 px-8 lg:px-12 py-8 bg-cream-50 border border-black/10">
              <p className="font-body text-center text-black/60 italic">
                Sunday Swings: Random thoughts and observations from the week. <br />
                Sometimes philosophical, sometimes ridiculous. Always honest.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}


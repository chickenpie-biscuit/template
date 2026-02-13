'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Calendar, Clock, Share2 } from 'lucide-react';

interface DesignWorkLayoutProps {
  post: any;
}

export default function DesignWorkLayout({ post }: DesignWorkLayoutProps) {
  const heroImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1400).url()
    : null;

  // Calculate reading time
  const wordCount = post.body
    ? JSON.stringify(post.body).split(/\s+/).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format date
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="min-h-screen bg-cream">
      {/* Article Header */}
      <header className="pt-32 pb-12 lg:pt-40 lg:pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {/* Category Tag */}
            <div className="inline-block mb-6">
              <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-goldenrod bg-goldenrod/10 px-4 py-2 border border-goldenrod/30">
                Design Stuff
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-black mb-6 leading-[1.1]">
              {post.title}
            </h1>

            {/* Description/Subtitle */}
            {post.description && (
              <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl mx-auto mb-8 font-body">
                {post.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-black/50 font-body">
              {publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishDate}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              <button 
                onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Featured Image */}
      {heroImageUrl && (
        <div className="mb-12 lg:mb-16">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-[16/9] bg-black/5 overflow-hidden">
                <Image
                  src={heroImageUrl}
                  alt={post.featuredImage?.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
              {post.featuredImage?.caption && (
                <p className="mt-4 text-center text-sm text-black/50 font-body italic">
                  {post.featuredImage.caption}
                </p>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Article Content */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Main Body Content */}
            {post.body && (
              <div className="prose prose-lg lg:prose-xl max-w-none font-body
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-black prose-headings:mt-12 prose-headings:mb-6
                prose-h2:text-3xl prose-h2:lg:text-4xl
                prose-h3:text-2xl prose-h3:lg:text-3xl
                prose-p:text-black/80 prose-p:leading-[1.8] prose-p:mb-6
                prose-a:text-goldenrod prose-a:font-semibold prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-black
                prose-strong:text-black prose-strong:font-bold
                prose-ul:text-black/80 prose-ul:my-6
                prose-ol:text-black/80 prose-ol:my-6
                prose-li:my-2
                prose-blockquote:border-l-4 prose-blockquote:border-goldenrod prose-blockquote:bg-goldenrod/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-black/70
                prose-img:rounded-none prose-img:my-8
                prose-code:bg-black/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-black prose-pre:text-cream prose-pre:rounded-none prose-pre:border-2 prose-pre:border-black
              ">
                <PortableText content={post.body} />
              </div>
            )}

            {/* Project Gallery */}
            {post.projectGallery && post.projectGallery.length > 0 && (
              <div className="mt-16 pt-16 border-t border-black/10">
                <h2 className="font-heading font-bold text-2xl mb-8 text-black">
                  Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.projectGallery.map((image: any, index: number) => {
                    const imageUrl = urlFor(image).width(800).url();
                    return (
                      <div key={index} className="group">
                        <div className="relative aspect-[4/3] bg-black/5 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={image.alt || `Image ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        {image.caption && (
                          <p className="mt-3 text-sm text-black/50 font-body">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags/Services */}
            {post.services && post.services.length > 0 && (
              <div className="mt-12 pt-8 border-t border-black/10">
                <div className="flex flex-wrap gap-2">
                  {post.services.map((service: any, index: number) => (
                    typeof service === 'string' && (
                      <span
                        key={index}
                        className="font-heading text-xs uppercase tracking-wider px-3 py-1.5 bg-black/5 text-black/60"
                      >
                        {service}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* CTA Link */}
            {post.ctaLink && (
              <div className="mt-12 pt-8 border-t border-black/10 text-center">
                <a
                  href={post.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-goldenrod text-black hover:bg-black hover:text-goldenrod border-2 border-black font-heading font-bold uppercase text-sm tracking-wider transition-all duration-300"
                >
                  {post.ctaText || 'View Project'}
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Author/Source Section */}
      <section className="py-12 bg-black text-cream">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-cream/40 mb-4">
              Written by
            </p>
            <p className="font-heading font-bold text-2xl text-goldenrod mb-2">
              Chickenpie
            </p>
            <p className="font-body text-cream/60 text-sm">
              Design, creativity, and the occasional deep dive into things that spark joy.
            </p>
          </div>
        </Container>
      </section>
    </article>
  );
}

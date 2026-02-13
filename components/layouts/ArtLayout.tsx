'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Palette, Eye } from 'lucide-react';

interface ArtLayoutProps {
  post: any;
}

export default function ArtLayout({ post }: ArtLayoutProps) {
  // Get full resolution image without cropping
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).url()
    : null;

  // Check for video content
  const hasVideo = post.featuredVideo || post.videoUrl;
  const videoUrl = post.featuredVideo || post.videoUrl;

  return (
    <article className="min-h-screen bg-cream">
      {/* Minimal Header - z-30 to stay below global back button */}
      <div className="border-b border-black/10 bg-white/50 backdrop-blur-sm sticky top-0 z-30">
        <Container>
          <div className="py-6 flex items-center gap-3">
            <Palette className="w-5 h-5 text-black/40" />
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-black/60">
              Gallery
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Gallery Media (Museum Frame) - Video or Image */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Frame with shadow */}
            <div className="relative">
              {/* Outer frame */}
              <div className="bg-gradient-to-br from-black via-black/90 to-black/80 p-3 md:p-6 shadow-2xl">
                {/* Inner white matte */}
                <div className="bg-white p-4 md:p-8">
                  {hasVideo ? (
                    <div className="relative bg-black">
                      <video
                        src={videoUrl}
                        className="w-full h-auto block"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={imageUrl || undefined}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : imageUrl ? (
                    <div className="relative bg-cream-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={post.featuredImage?.alt || post.title}
                        className="w-full h-auto block"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] w-full bg-cream-200 flex items-center justify-center">
                      <span className="font-heading text-black/20 uppercase">No Media</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gallery Label Plaque */}
              <div className="mt-6 bg-white border border-black/20 p-4 shadow-md max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading text-sm uppercase tracking-wider text-black/80">
                      {post.title}
                    </p>
                    {post.publishedAt && (
                      <p className="font-body text-xs text-black/50 mt-1">
                        {new Date(post.publishedAt).getFullYear()}
                      </p>
                    )}
                  </div>
                  {hasVideo && (
                    <span className="px-2 py-1 bg-black text-cream font-heading text-[10px] font-bold uppercase tracking-wider">
                      Video
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-32">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-black/20 mb-6">
                <Eye className="w-4 h-4 text-black/60" />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-black/60">
                  Original Artwork
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-8 leading-[0.95] text-black">
                {post.title}
              </h1>

              {/* Artist Statement / Description */}
              {post.description && (
                <div className="mb-8 pb-8 border-b border-black/10">
                  <p className="font-heading text-xs uppercase tracking-wider text-black/40 mb-3">
                    Artist Statement
                  </p>
                  <p className="text-lg font-body text-black/80 leading-relaxed italic">
                    {post.description}
                  </p>
                </div>
              )}

              {/* Extended Details */}
              {post.body && (
                <div className="prose prose-sm max-w-none font-body text-black/70 mb-8
                  prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-black
                  prose-p:leading-relaxed prose-p:text-black/70
                  prose-a:text-black prose-a:font-bold hover:prose-a:underline
                  prose-strong:text-black">
                  <PortableText content={post.body} />
                </div>
              )}

              {/* Purchase CTA */}
              {post.ctaLink && typeof post.ctaLink === 'string' && (
                <div className="space-y-3">
                  <a
                    href={post.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-black text-cream font-heading font-bold uppercase text-center hover:bg-goldenrod hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all"
                  >
                    {typeof post.ctaText === 'string' ? post.ctaText : 'Inquire About Purchase'}
                  </a>
                  <p className="text-xs font-body text-black/50 text-center">
                    Limited availability · Contact for pricing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}


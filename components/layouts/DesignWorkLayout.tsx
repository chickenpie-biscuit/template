'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Calendar, User, Briefcase, Target, Lightbulb, TrendingUp } from 'lucide-react';

interface DesignWorkLayoutProps {
  post: any;
}

export default function DesignWorkLayout({ post }: DesignWorkLayoutProps) {
  const heroImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1920).url()
    : null;

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      {heroImageUrl && (
        <div className="relative w-full h-[60vh] lg:h-[80vh] bg-black">
          <Image
            src={heroImageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover opacity-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 pb-16 lg:pb-24">
            <Container>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-0.5 bg-goldenrod" />
                  <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-goldenrod">
                    Case Study
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase text-white mb-6 leading-[0.95]">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                )}
              </div>
            </Container>
          </div>
        </div>
      )}

      {/* Project Meta Bar */}
      <div className="border-y-2 border-black bg-cream">
        <Container>
          <div className="py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {post.client && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-wider text-black/60 mb-1">Client</p>
                  <p className="font-heading font-bold text-black">{post.client}</p>
                </div>
              </div>
            )}

            {post.projectYear && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-wider text-black/60 mb-1">Year</p>
                  <p className="font-heading font-bold text-black">{post.projectYear}</p>
                </div>
              </div>
            )}

            {post.services && post.services.length > 0 && (
              <div className="flex items-start gap-3 col-span-2">
                <Briefcase className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-wider text-black/60 mb-1">Services</p>
                  <p className="font-heading font-bold text-black">{post.services.join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 max-w-6xl mx-auto">
          {/* Challenge & Solution Grid */}
          {(post.projectChallenge || post.projectSolution) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* The Challenge */}
              {post.projectChallenge && (
                <div className="border-2 border-black p-8 lg:p-12 bg-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8 text-red" />
                    <h2 className="font-heading font-bold uppercase text-3xl">The Challenge</h2>
                  </div>
                  <p className="text-lg text-black/80 leading-relaxed font-body">
                    {post.projectChallenge}
                  </p>
                </div>
              )}

              {/* The Solution */}
              {post.projectSolution && (
                <div className="border-2 border-black p-8 lg:p-12 bg-goldenrod">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-8 h-8 text-black" />
                    <h2 className="font-heading font-bold uppercase text-3xl text-black">The Solution</h2>
                  </div>
                  <p className="text-lg text-black leading-relaxed font-body">
                    {post.projectSolution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Main Content */}
          {post.body && (
            <div className="mb-20">
              <div className="prose prose-lg lg:prose-xl max-w-none font-body
                prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-black
                prose-p:text-black/80 prose-p:leading-relaxed
                prose-a:text-teal prose-a:font-bold hover:prose-a:underline
                prose-strong:text-black prose-strong:font-bold
                prose-ul:text-black/80 prose-ol:text-black/80">
                <PortableText content={post.body} />
              </div>
            </div>
          )}

          {/* Project Gallery */}
          {post.projectGallery && post.projectGallery.length > 0 && (
            <div className="mb-20">
              <h2 className="font-heading font-bold uppercase text-4xl mb-12 flex items-center gap-3">
                <span className="w-1 h-12 bg-goldenrod" />
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {post.projectGallery.map((image: any, index: number) => {
                  const imageUrl = urlFor(image).width(800).url();
                  return (
                    <div key={index} className="border-2 border-black bg-white p-4 hover:shadow-xl transition-shadow">
                      <div className="relative w-full aspect-video bg-cream-100">
                        <Image
                          src={imageUrl}
                          alt={image.alt || `Project image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      {image.caption && (
                        <p className="mt-4 font-heading text-sm uppercase tracking-wider text-black/60">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results/Impact */}
          {post.projectResults && post.projectResults.length > 0 && (
            <div className="bg-black text-cream p-12 lg:p-16 border-2 border-black">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8 text-goldenrod" />
                <h2 className="font-heading font-bold uppercase text-4xl">Results & Impact</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.projectResults.map((result: string, index: number) => (
                  <div key={index} className="border-2 border-goldenrod p-6 bg-black/50">
                    <p className="font-heading text-xl font-bold text-goldenrod">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {post.ctaLink && (
            <div className="mt-20 text-center">
              <a
                href={post.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-goldenrod text-black hover:bg-black hover:text-goldenrod border-2 border-black font-heading font-bold uppercase text-lg transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
              >
                {post.ctaText || 'View Live Project'}
              </a>
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}


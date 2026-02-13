'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { MapPin, Flag, Trophy, Activity, Wind, Phone, Globe, ExternalLink } from 'lucide-react';

interface CourseReviewLayoutProps {
  post: any;
}

export default function CourseReviewLayout({ post }: CourseReviewLayoutProps) {
  const heroImageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1920).height(1080).url()
    : null;

  const mapImageUrl = post.courseMap
    ? urlFor(post.courseMap).width(800).url()
    : null;

  return (
    <article className="min-h-screen bg-cream">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 pb-16 lg:pb-24">
            <Container>
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-0.5 bg-goldenrod" />
                  <span className="font-heading font-bold uppercase text-xs tracking-[0.3em] text-goldenrod">
                    Course Review
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-8xl font-heading font-bold uppercase text-white mb-6 leading-[0.9] tracking-tight">
                  {post.title}
                </h1>

                {post.courseLocation && typeof post.courseLocation === 'string' && (
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-5 h-5 text-goldenrod" />
                    <span className="font-heading text-lg uppercase tracking-wider">{post.courseLocation}</span>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="bg-black text-white border-b-4 border-goldenrod sticky top-0 z-30 shadow-xl">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            <div className="flex flex-col items-center md:items-start border-r border-white/10 last:border-0">
              <div className="flex items-center gap-2 mb-1 text-goldenrod">
                <Flag className="w-4 h-4" />
                <span className="font-heading text-xs uppercase tracking-widest">Par</span>
              </div>
              <span className="font-heading text-2xl font-bold">{(typeof post.coursePar === 'number' || typeof post.coursePar === 'string') ? post.coursePar : '-'}</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start border-r border-white/10 last:border-0">
              <div className="flex items-center gap-2 mb-1 text-goldenrod">
                <Trophy className="w-4 h-4" />
                <span className="font-heading text-xs uppercase tracking-widest">Rating</span>
              </div>
              <span className="font-heading text-2xl font-bold">{typeof post.courseRating === 'number' ? `${post.courseRating}/10` : '-'}</span>
            </div>

            <div className="flex flex-col items-center md:items-start border-r border-white/10 last:border-0">
              <div className="flex items-center gap-2 mb-1 text-goldenrod">
                <Activity className="w-4 h-4" />
                <span className="font-heading text-xs uppercase tracking-widest">Difficulty</span>
              </div>
              <span className="font-heading text-2xl font-bold">{typeof post.courseDifficulty === 'number' ? `${post.courseDifficulty}/10` : '-'}</span>
            </div>

            <div className="flex flex-col items-center md:items-start border-r border-white/10 last:border-0">
              <div className="flex items-center gap-2 mb-1 text-goldenrod">
                <Wind className="w-4 h-4" />
                <span className="font-heading text-xs uppercase tracking-widest">Conditions</span>
              </div>
              <span className="font-heading text-2xl font-bold">{typeof post.courseConditions === 'number' ? `${post.courseConditions}/10` : '-'}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Review Content */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 lg:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16">
              {post.description && (
                <p className="text-xl font-body italic text-black/70 leading-relaxed mb-8 border-l-4 border-goldenrod pl-6">
                  {post.description}
                </p>
              )}
              
              {post.body && (
                <div className="prose prose-lg max-w-none font-body text-black/80
                  prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-black
                  prose-p:leading-relaxed
                  prose-a:text-goldenrod prose-a:font-bold hover:prose-a:underline
                  prose-strong:text-black prose-strong:font-bold
                  prose-img:rounded-sm prose-img:border-2 prose-img:border-black">
                  <PortableText content={post.body} />
                </div>
              )}
            </div>

            {/* Course Gallery */}
            {post.courseGallery && post.courseGallery.length > 0 && (
              <div className="mb-16">
                <h2 className="font-heading font-bold uppercase text-3xl mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-goldenrod" />
                  Course Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.courseGallery.map((image: any, index: number) => {
                    const imageUrl = urlFor(image).width(800).height(600).url();
                    return (
                      <div key={index} className="relative aspect-[4/3] border-2 border-black group overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={image.alt || `Course image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-heading text-xs text-goldenrod uppercase tracking-wider">{image.caption}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-12">
            {/* Map/Scorecard */}
            {mapImageUrl && (
              <div className="bg-white border-2 border-black p-4">
                <div className="relative aspect-[3/4] w-full bg-cream-100 border border-black/10">
                  <Image
                    src={mapImageUrl}
                    alt="Course Map or Scorecard"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-center font-heading text-xs uppercase tracking-widest mt-4 text-black/40">Course Layout / Scorecard</p>
              </div>
            )}

            {/* Contact Info Card */}
            <div className="bg-black text-white p-8 border-4 border-goldenrod relative overflow-hidden">
              {/* Retro scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10" 
                style={{
                  backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                  backgroundSize: '100% 2px, 3px 100%'
                }}
              />
              
              <h3 className="font-heading font-bold uppercase text-xl mb-6 text-goldenrod flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Course Info
              </h3>

              <div className="space-y-4 relative z-10">
                {post.courseWebsite && typeof post.courseWebsite === 'string' && (
                  <a 
                    href={post.courseWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-goldenrod transition-colors group"
                  >
                    <div className="w-8 h-8 border border-white/20 group-hover:border-goldenrod flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="font-heading text-sm uppercase tracking-wider">Visit Website</span>
                  </a>
                )}
                
                {post.coursePhone && typeof post.coursePhone === 'string' && (
                  <a 
                    href={`tel:${post.coursePhone}`}
                    className="flex items-center gap-3 text-white hover:text-goldenrod transition-colors group"
                  >
                    <div className="w-8 h-8 border border-white/20 group-hover:border-goldenrod flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-heading text-sm uppercase tracking-wider">{post.coursePhone}</span>
                  </a>
                )}
              </div>

              {/* Book Tee Time CTA */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <a
                  href={post.ctaLink || post.courseWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-goldenrod text-black font-heading font-bold uppercase text-center hover:bg-white transition-colors border-2 border-transparent hover:border-goldenrod"
                >
                  Book Tee Time
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

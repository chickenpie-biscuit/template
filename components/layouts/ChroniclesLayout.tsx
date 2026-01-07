'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface ChroniclesLayoutProps {
  post: any;
}

export default function ChroniclesLayout({ post }: ChroniclesLayoutProps) {
  const illustrationUrl = post.storyIllustration
    ? urlFor(post.storyIllustration).width(1200).url()
    : null;

  return (
    <article className="min-h-screen bg-cream relative overflow-hidden">
      {/* Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Storybook Header */}
      <div className="relative border-b-4 border-black bg-goldenrod">
        <Container>
          <div className="py-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-black" />
              <span className="font-heading font-bold uppercase text-sm tracking-[0.3em] text-black">
                Chicken Chronicles
              </span>
            </div>
            
            {post.episodeNumber && (
              <p className="font-heading text-black/60 text-lg mb-2">
                Episode {post.episodeNumber}
              </p>
            )}

            {post.characterName && (
              <div className="inline-block px-6 py-2 bg-black text-goldenrod font-heading font-bold uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                Featuring: {post.characterName}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-24 max-w-5xl mx-auto">
          {/* Story Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase leading-[0.95] mb-6 text-black drop-shadow-sm">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-2xl font-body italic text-black/70 max-w-3xl mx-auto leading-relaxed">
                {post.description}
              </p>
            )}
          </div>

          {/* Illustration */}
          {illustrationUrl && (
            <div className="mb-16 relative">
              <div className="bg-white p-4 lg:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative">
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-goldenrod -m-1" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-goldenrod -m-1" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-goldenrod -m-1" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-goldenrod -m-1" />
                
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={illustrationUrl}
                    alt={post.storyIllustration?.alt || post.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Story Content */}
          {post.body && (
            <div className="bg-white/80 backdrop-blur-sm p-8 lg:p-16 border-4 border-black shadow-lg relative">
              {/* Decorative Initial Letter Placeholder */}
              <div className="float-left w-20 h-20 bg-goldenrod border-2 border-black mr-6 mb-4 flex items-center justify-center">
                <span className="font-heading text-5xl font-bold text-black">
                  {post.title.charAt(0)}
                </span>
              </div>

              <div className="prose prose-xl max-w-none font-body text-black/90 
                prose-p:leading-relaxed prose-p:mb-6
                prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase
                prose-strong:text-black prose-strong:font-bold
                prose-em:italic prose-em:text-black/80">
                <PortableText content={post.body} />
              </div>

              {/* Story End Mark */}
              <div className="text-center mt-12 pt-8 border-t-2 border-black/20">
                <div className="inline-flex items-center gap-4">
                  <div className="w-8 h-0.5 bg-black" />
                  <span className="font-heading text-2xl text-black">◆</span>
                  <div className="w-8 h-0.5 bg-black" />
                </div>
                <p className="mt-4 font-heading text-xs uppercase tracking-widest text-black/40">
                  End of Episode {post.episodeNumber || ''}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Hint */}
          <div className="mt-16 flex items-center justify-between max-w-md mx-auto">
            <button className="flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <div className="w-16 h-1 bg-black/20" />
            <button className="flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-black/40 hover:text-black transition-colors">
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </article>
  );
}


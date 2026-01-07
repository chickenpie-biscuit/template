'use client';

import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface QuoteLayoutProps {
  post: any;
}

export default function QuoteLayout({ post }: QuoteLayoutProps) {
  return (
    <article className="min-h-screen bg-cream flex flex-col justify-center relative overflow-hidden">
      <Container>
        <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
          <span className="inline-block mb-12 text-black/20 text-8xl font-heading leading-none">
            &ldquo;
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase leading-[0.95] tracking-tight mb-12 text-black">
            {post.title}
          </h1>

          {(post.description || post.body) && (
            <div className="max-w-2xl mx-auto border-t-2 border-black/10 pt-12 mt-12">
              {post.description && (
                <p className="text-xl lg:text-2xl font-body text-black/60 leading-relaxed mb-8">
                  {post.description}
                </p>
              )}
              {post.body && (
                <div className="prose prose-lg mx-auto font-body text-black/80">
                  <PortableText content={post.body} />
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}


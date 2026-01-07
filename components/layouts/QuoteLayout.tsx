'use client';

import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface QuoteLayoutProps {
  post: any;
}

export default function QuoteLayout({ post }: QuoteLayoutProps) {
  return (
    <article className="min-h-screen bg-black text-cream flex flex-col justify-center relative overflow-hidden">
      {/* Background Texture/Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Container>
        <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
          <span className="inline-block mb-12 text-cream/40 text-6xl font-heading">
            &ldquo;
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold uppercase leading-tight tracking-tight mb-12">
            {post.title}
          </h1>

          {(post.description || post.body) && (
            <div className="max-w-2xl mx-auto border-t border-cream/20 pt-12 mt-12">
              {post.description && (
                <p className="text-xl lg:text-2xl font-body text-cream/80 leading-relaxed mb-8">
                  {post.description}
                </p>
              )}
              {post.body && (
                <div className="prose prose-lg prose-invert mx-auto font-body">
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


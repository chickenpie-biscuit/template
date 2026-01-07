import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface PortableTextProps {
  content: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      // Robust check for asset
      if (!value?.asset?._ref) {
        return null;
      }

      try {
        const imageUrl = urlFor(value).url();
        const alt = value.alt || 'Article image';

        return (
          <figure className="my-12">
            <div className="relative w-full aspect-[16/9] overflow-hidden border-2 border-black bg-cream-200">
              <Image
                src={imageUrl}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-3 text-center font-heading text-xs font-bold uppercase tracking-widest text-black/60">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      } catch (error) {
        console.error('Error rendering PortableText image:', error);
        return null;
      }
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-heading font-bold uppercase mt-12 mb-6 text-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-heading font-bold uppercase mt-8 mb-4 text-black">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-black pl-6 py-2 my-8 text-xl font-heading italic text-black/80 bg-white/50 p-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-black">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 marker:font-bold">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel}
          className="text-red-500 font-bold hover:underline decoration-2 underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableText({ content }: PortableTextProps) {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none font-body text-black/80">
      <PortableTextComponent value={content} components={components} />
    </div>
  );
}

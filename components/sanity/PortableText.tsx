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
      const imageUrl = value?.asset ? urlFor(value).url() : null;
      const alt = value?.alt || 'Blog post image';

      if (!imageUrl) return null;

      return (
        <div className="relative w-full aspect-[16/9] my-8 overflow-hidden border-2 border-black">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 w-full bg-black/80 p-2">
              <p className="text-white text-xs font-body text-center">{value.caption}</p>
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    // Customize styling for different block types if needed
    h2: ({ children }) => (
      <h2 className="text-3xl font-heading font-bold uppercase mt-12 mb-6 text-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-heading font-bold uppercase mt-8 mb-4 text-black">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-black pl-6 py-2 my-8 text-xl font-heading italic text-black/80">
        {children}
      </blockquote>
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
          className="text-red-500 font-bold hover:underline"
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

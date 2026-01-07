'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface CommerceLayoutProps {
  post: any;
}

export default function CommerceLayout({ post }: CommerceLayoutProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(1200).url()
    : null;

  return (
    <article className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Product Image */}
        <div className="relative h-[50vh] lg:h-screen bg-cream-100 flex items-center justify-center p-12 lg:sticky lg:top-0">
          {imageUrl && (
            <div className="relative w-full h-full max-w-2xl max-h-[80vh]">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center p-8 lg:p-24 bg-white">
          <div className="max-w-xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-teal text-cream text-xs font-heading font-bold uppercase tracking-widest">
                Merch Drop
              </span>
              {post.productType && (
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-black/40">
                  {post.productType}
                </span>
              )}
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-4 leading-none">
              {post.title}
            </h1>

            {/* Price */}
            {post.price && (
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-heading font-bold">
                  ${post.price}
                </span>
                {post.originalPrice && (
                  <span className="text-xl font-body text-black/40 line-through">
                    ${post.originalPrice}
                  </span>
                )}
              </div>
            )}

            <div className="h-px bg-black/10 w-full mb-8" />

            {/* Description */}
            <div className="prose prose-lg font-body text-black/80 mb-12">
              <p className="text-xl leading-relaxed mb-6">
                {post.description}
              </p>
              {post.body && <PortableText content={post.body} />}
            </div>

            {/* Sticky Mobile CTA / Desktop CTA */}
            <div className="sticky bottom-0 lg:relative py-4 lg:py-0 bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-t border-black/10 lg:border-0">
              {post.stock !== undefined && post.stock <= 0 ? (
                <button disabled className="w-full py-5 bg-gray-200 text-gray-500 font-heading font-bold uppercase cursor-not-allowed">
                  Sold Out
                </button>
              ) : (
                <button className="w-full py-5 bg-black text-cream font-heading font-bold uppercase hover:bg-teal hover:text-black transition-colors text-lg">
                  Add to Cart — ${post.price}
                </button>
              )}
              {post.stock !== undefined && post.stock > 0 && post.stock < 10 && (
                <p className="text-xs font-heading font-bold uppercase text-red-500 mt-3 text-center">
                  Low Stock: Only {post.stock} left
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


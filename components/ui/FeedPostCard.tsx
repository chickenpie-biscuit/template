'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface FeedPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage?: any;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  price?: number;
  originalPrice?: number;
  findPrice?: string;
  findHighlight?: string;
}

interface FeedPostCardProps {
  post: FeedPost;
}

const categoryLabels: Record<string, string> = {
  'design-work': 'DESIGN WORK',
  'merch-drops': 'MERCH DROPS',
  'food': 'FOOD',
  'finds': 'FINDS',
  'thoughts': 'THOUGHTS',
};

const categoryColors: Record<string, string> = {
  'design-work': 'bg-teal',
  'merch-drops': 'bg-teal',
  'food': 'bg-goldenrod',
  'finds': 'bg-red',
  'thoughts': 'bg-black',
};

export default function FeedPostCard({ post }: FeedPostCardProps) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(800).height(1200).url()
    : null;

  const categoryLabel = categoryLabels[post.category] || post.category.toUpperCase();
  const categoryColor = categoryColors[post.category] || 'bg-black';
  const href = post.ctaLink || `/feed/${post.slug}`;

  // THOUGHTS - Quote Card Design (Text Only)
  if (post.category === 'thoughts') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden"
      >
        <div className="relative p-8 md:p-12 min-h-[300px] flex flex-col justify-center items-center text-center bg-black">
          {/* Quote Text */}
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-cream leading-tight mb-4">
            "{post.title}"
          </h3>
          
          {/* Hover Overlay - Show description or CTA */}
          <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8">
            {post.description && (
              <p className="font-body text-sm text-cream/90 mb-4 line-clamp-4">
                {post.description}
              </p>
            )}
            <div className="bg-cream text-black px-4 py-2 border-2 border-cream font-heading text-sm font-bold uppercase">
              READ MORE
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // FINDS - Special Pinterest Card with Price Banner
  if (post.category === 'finds') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden relative"
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3 self-start`}>
                <span className="font-heading text-xs font-bold tracking-wider">
                  {categoryLabel}
                </span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-cream mb-2">
                {post.title}
              </h3>
              {post.description && (
                <p className="font-body text-sm text-cream/90 mb-4 line-clamp-2">
                  {post.description}
                </p>
              )}
              {post.findPrice && (
                <div className="bg-goldenrod text-black px-4 py-2 font-heading text-xl font-bold inline-block self-start mb-2">
                  {post.findPrice}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Banner (always visible) */}
        {post.findHighlight && (
          <div className="absolute top-0 left-0 right-0 bg-red text-cream text-center py-2 px-4 border-b-2 border-black z-10">
            <p className="font-heading text-xs font-bold uppercase tracking-wide">
              {post.findHighlight}
            </p>
          </div>
        )}
      </Link>
    );
  }

  // MERCH DROPS - Pinterest Card with Price on Hover
  if (post.category === 'merch-drops') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden relative"
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3 self-start`}>
                <span className="font-heading text-xs font-bold tracking-wider">
                  {categoryLabel}
                </span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-cream mb-2">
                {post.title}
              </h3>
              {post.description && (
                <p className="font-body text-sm text-cream/90 mb-4 line-clamp-2">
                  {post.description}
                </p>
              )}
              
              {/* Price */}
              {post.price && (
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-2xl font-bold text-cream">
                    ${post.price.toFixed(2)}
                  </span>
                  {post.originalPrice && (
                    <span className="font-body text-sm line-through text-cream/60">
                      ${post.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              )}

              <div className="bg-cream text-black px-4 py-2 inline-block self-start border-2 border-cream font-heading text-sm font-bold uppercase">
                SHOP NOW
              </div>
            </div>
          </div>
        )}
      </Link>
    );
  }

  // DEFAULT (Design Work, Food) - Clean Pinterest Card
  return (
    <Link
      href={href}
      className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden relative"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover"
          />
          
          {/* Hover Overlay - Gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3 self-start`}>
              <span className="font-heading text-xs font-bold tracking-wider">
                {categoryLabel}
              </span>
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-cream mb-2">
              {post.title}
            </h3>
            {post.description && (
              <p className="font-body text-sm text-cream/90 mb-4 line-clamp-3">
                {post.description}
              </p>
            )}
            <div className="bg-cream text-black px-4 py-2 inline-block self-start border-2 border-cream font-heading text-sm font-bold uppercase">
              {post.ctaText || 'VIEW'}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

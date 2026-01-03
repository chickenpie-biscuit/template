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
    ? urlFor(post.featuredImage).width(600).height(800).url()
    : null;

  const categoryLabel = categoryLabels[post.category] || post.category.toUpperCase();
  const categoryColor = categoryColors[post.category] || 'bg-black';
  const href = post.ctaLink || `/feed/${post.slug}`;

  // Finds Card Design
  if (post.category === 'finds') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
      >
        {/* Highlight Banner */}
        {post.findHighlight && (
          <div className="bg-red text-cream text-center py-2 px-4 border-b-2 border-black">
            <p className="font-heading text-sm font-bold uppercase tracking-wide">
              {post.findHighlight}
            </p>
          </div>
        )}

        {/* Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[4/3] border-b-2 border-black overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Price Section */}
        {post.findPrice && (
          <div className="bg-goldenrod border-b-2 border-black py-6 px-4 text-center">
            <p className="font-heading text-5xl font-bold text-black">
              {post.findPrice}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3`}>
            <span className="font-heading text-xs font-bold tracking-wider">
              {categoryLabel}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold uppercase mb-2 text-black">
            {post.title}
          </h3>
          {post.description && (
            <p className="font-body text-sm text-black/80 mb-4 line-clamp-2">
              {post.description}
            </p>
          )}
          <div className="bg-red text-cream px-4 py-2 inline-block border-2 border-black font-heading text-sm font-bold uppercase hover:bg-black transition-colors">
            {post.ctaText || 'READ MORE'}
          </div>
        </div>
      </Link>
    );
  }

  // Merch Drops Card Design
  if (post.category === 'merch-drops') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full aspect-square border-b-2 border-black overflow-hidden bg-white">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3`}>
            <span className="font-heading text-xs font-bold tracking-wider">
              {categoryLabel}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold uppercase mb-2 text-black">
            {post.title}
          </h3>
          {post.description && (
            <p className="font-body text-sm text-black/80 mb-4 line-clamp-2">
              {post.description}
            </p>
          )}
          
          {/* Price */}
          {post.price && (
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-heading text-2xl font-bold text-black">
                ${post.price.toFixed(2)}
              </span>
              {post.originalPrice && (
                <span className="font-body text-sm line-through text-black/50">
                  ${post.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}

          <div className="bg-red text-cream px-4 py-2 inline-block border-2 border-black font-heading text-sm font-bold uppercase hover:bg-black transition-colors">
            {post.ctaText || 'SHOP NOW'}
          </div>
        </div>
      </Link>
    );
  }

  // Default Card Design (Design Work, Food, Thoughts)
  return (
    <Link
      href={href}
      className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[3/4] border-b-2 border-black overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3`}>
          <span className="font-heading text-xs font-bold tracking-wider">
            {categoryLabel}
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold uppercase mb-2 text-black">
          {post.title}
        </h3>
        {post.description && (
          <p className="font-body text-sm text-black/80 mb-4 line-clamp-3">
            {post.description}
          </p>
        )}
        <div className="bg-red text-cream px-4 py-2 inline-block border-2 border-black font-heading text-sm font-bold uppercase hover:bg-black transition-colors">
          {post.ctaText || 'WOWWWWW'}
        </div>
      </div>
    </Link>
  );
}

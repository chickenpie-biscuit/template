'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { useState } from 'react';

interface FeedPost {
  _id: string;
  _type?: string;
  title: string;
  slug: string;
  category?: string;
  featuredImage?: any;
  mainImage?: any;
  description?: string;
  excerpt?: string;
  ctaText?: string;
  ctaLink?: string;
  price?: number;
  originalPrice?: number;
  findPrice?: string;
  findHighlight?: string;
  author?: string;
}

interface FeedPostCardProps {
  post: FeedPost;
}

const categoryLabels: Record<string, string> = {
  'design-work': 'DESIGN WORK',
  'art': 'ART',
  'merch-drops': 'MERCH DROPS',
  'food': 'FOOD',
  'finds': 'FINDS',
  'thoughts': 'THOUGHTS',
  'prompt-week': 'PROMPT OF THE WEEK',
  'chronicles': 'CHICKEN CHRONICLES',
  'tool-tuesday': 'TOOL TUESDAY',
  'solopreneur': 'SOLOPRENEUR SUNDAYS',
  'sunday-swings': 'SUNDAY SWINGS',
};

const categoryColors: Record<string, string> = {
  'design-work': 'bg-teal',
  'art': 'bg-black',
  'merch-drops': 'bg-teal',
  'food': 'bg-goldenrod',
  'finds': 'bg-red',
  'thoughts': 'bg-black',
  'prompt-week': 'bg-black',
  'chronicles': 'bg-goldenrod',
  'tool-tuesday': 'bg-teal',
  'solopreneur': 'bg-teal',
  'sunday-swings': 'bg-goldenrod',
};

export default function FeedPostCard({ post }: FeedPostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Handle both feedPost (featuredImage) and regular post (mainImage)
  const image = post.featuredImage || post.mainImage;
  const imageUrl = image
    ? urlFor(image).width(800).height(1200).url()
    : null;
  
  const blurDataUrl = image
    ? urlFor(image).width(20).height(20).blur(10).url()
    : undefined;

  // For blog posts, default category to 'thoughts'
  const category = post.category || 'thoughts';
  const categoryLabel = categoryLabels[category] || category.toUpperCase();
  const categoryColor = categoryColors[category] || 'bg-black';
  
  // Use excerpt if description is not available (for blog posts)
  const displayDescription = post.description || post.excerpt;
  
  // Determine link based on type
  const href = post.ctaLink || (post._type === 'post' ? `/blog/${post.slug}` : `/feed/${post.slug}`);
  
  // Truncate title for display
  const truncatedTitle = post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title;

  // PROMPT OF THE WEEK - Tech/Code Aesthetic
  if (category === 'prompt-week') {
    return (
      <Link
        href={href}
        className="group block border-2 border-teal bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,221,221,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="relative p-8 min-h-[400px] flex flex-col">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-teal">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-cream leading-tight mb-4 flex-1">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-sm text-cream/70 mb-4 line-clamp-3">
              {displayDescription}
            </p>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal via-teal/90 to-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center">
            <div className="font-mono text-black text-xs mb-4 bg-black/20 p-2 rounded">
              {"<AI_PROMPT>"}
            </div>
            <p className="font-heading text-black font-bold uppercase text-lg mb-4">
              Copy Winning Prompt
            </p>
            <div className="bg-black text-teal px-4 py-2 border-2 border-black font-heading text-sm font-bold uppercase">
              VIEW PROMPT
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // CHICKEN CHRONICLES - Storybook Card
  if (category === 'chronicles') {
    return (
      <Link
        href={href}
        className="group block border-4 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="relative bg-goldenrod p-4 border-b-4 border-black">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-black">
            {categoryLabel}
          </span>
        </div>

        {imageUrl && (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-white">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}

        <div className="p-6 bg-cream">
          <h3 className="font-heading text-2xl font-bold uppercase text-black leading-tight mb-3">
            {truncatedTitle}
          </h3>
          {displayDescription && (
            <p className="font-body text-black/70 mb-4 line-clamp-3">
              {displayDescription}
            </p>
          )}
          <div className="bg-black text-goldenrod px-4 py-2 inline-block border-2 border-black font-heading text-sm font-bold uppercase group-hover:bg-goldenrod group-hover:text-black transition-colors">
            READ STORY
          </div>
        </div>
      </Link>
    );
  }

  // TOOL TUESDAY - Product Review Card
  if (category === 'tool-tuesday') {
    return (
      <Link
        href={href}
        className="group block border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {imageUrl && (
          <div className="relative w-full aspect-square overflow-hidden bg-cream-100 border-b-4 border-black flex items-center justify-center p-8">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-teal text-black px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider">
              {categoryLabel}
            </div>
          </div>

          <h3 className="font-heading text-2xl font-bold uppercase text-black leading-tight mb-3">
            {truncatedTitle}
          </h3>

          {displayDescription && (
            <p className="font-body text-black/70 mb-4 line-clamp-3">
              {displayDescription}
            </p>
          )}

          <div className="bg-black text-cream px-4 py-2 inline-block border-2 border-black font-heading text-sm font-bold uppercase group-hover:bg-teal group-hover:text-black transition-colors">
            READ REVIEW
          </div>
        </div>
      </Link>
    );
  }

  // SOLOPRENEUR SUNDAYS - Metrics/Dashboard Card
  if (category === 'solopreneur') {
    return (
      <Link
        href={href}
        className="group block border-2 border-teal bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,221,221,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="p-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal to-goldenrod text-black px-4 py-2 mb-6 inline-block">
            <span className="font-heading text-xs font-bold uppercase tracking-widest">
              {categoryLabel}
            </span>
          </div>

          {/* Week Number */}
          <h3 className="font-heading text-4xl font-bold text-cream mb-4">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-cream/70 mb-6 line-clamp-3">
              {displayDescription}
            </p>
          )}

          {/* Metrics Hint */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-cream/5 border border-cream/20 p-3">
              <p className="text-xs font-heading uppercase text-cream/60 mb-1">Revenue</p>
              <p className="text-xl font-heading font-bold text-teal">$XXX</p>
            </div>
            <div className="bg-cream/5 border border-cream/20 p-3">
              <p className="text-xs font-heading uppercase text-cream/60 mb-1">Week</p>
              <p className="text-xl font-heading font-bold text-goldenrod">#XX</p>
            </div>
          </div>

          <div className="bg-teal text-black px-4 py-2 inline-block border-2 border-teal font-heading text-sm font-bold uppercase group-hover:bg-cream group-hover:border-cream transition-colors">
            VIEW UPDATE
          </div>
        </div>
      </Link>
    );
  }

  // SUNDAY SWINGS - Editorial/Essay Card
  if (category === 'sunday-swings') {
    return (
      <Link
        href={href}
        className="group block border border-black/20 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-cream-100">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-8 bg-goldenrod" />
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/60">
              {categoryLabel}
            </span>
          </div>

          <h3 className="font-heading text-3xl font-bold text-black leading-[1.1] mb-4">
            {truncatedTitle}
          </h3>

          {displayDescription && (
            <p className="font-body text-lg text-black/70 mb-6 italic line-clamp-3 leading-relaxed">
              {displayDescription}
            </p>
          )}

          <div className="flex items-center gap-3 text-black/50 font-body text-sm">
            <span>5 min read</span>
            <span>•</span>
            <span>Essay</span>
          </div>
        </div>
      </Link>
    );
  }

  // THOUGHTS - Quote Card Design (Text Only)
  if (category === 'thoughts' || post._type === 'post') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="relative p-8 md:p-12 min-h-[300px] flex flex-col justify-center items-center text-center bg-black">
          {/* Quote Text */}
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-cream leading-tight mb-4">
            &ldquo;{truncatedTitle}&rdquo;
          </h3>
          
          {/* Hover Overlay - Show description or CTA */}
          <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8">
            {displayDescription && (
              <p className="font-body text-sm text-cream/90 mb-4 line-clamp-4">
                {displayDescription}
              </p>
            )}
            {post._type === 'post' && post.author && (
              <p className="font-body text-xs text-cream/70 mb-4">— {post.author}</p>
            )}
            <div className="bg-cream text-black px-4 py-2 border-2 border-cream font-heading text-sm font-bold uppercase transform group-hover:scale-110 transition-transform duration-300">
              READ MORE
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // FINDS - Special Card with Price Banner
  if (category === 'finds') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-cream-200 animate-pulse" />
            )}
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
              <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3 self-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100`}>
                <span className="font-heading text-xs font-bold tracking-wider">
                  {categoryLabel}
                </span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-cream mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                {truncatedTitle}
              </h3>
              {displayDescription && (
                <p className="font-body text-sm text-cream/90 mb-4 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                  {displayDescription}
                </p>
              )}
              {post.findPrice && (
                <div className="bg-goldenrod text-black px-4 py-2 font-heading text-xl font-bold inline-block self-start mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-250">
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

  // ART - Gallery Style (Full image, no crop, transparent bg)
  if (category === 'art') {
    return (
      <Link
        href={href}
        className="group block transition-all duration-300 relative h-full hover:-translate-y-1"
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-cream-200 animate-pulse rounded-sm" />
            )}
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Minimal Hover Info */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 backdrop-blur-[2px] rounded-sm">
              <span className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-2 border-b border-white pb-1">
                {post.title}
              </span>
              <span className="font-body text-white/80 text-xs uppercase tracking-wider">
                View Art
              </span>
            </div>
          </div>
        )}
      </Link>
    );
  }

  // MERCH DROPS - Product Card (Full image, no cropping)
  if (category === 'merch-drops') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
      >
        {/* Image - Full product display */}
        {imageUrl && (
          <div className="relative w-full aspect-square overflow-hidden bg-white flex items-center justify-center p-6">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-cream-200 animate-pulse" />
            )}
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
                placeholder={blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={blurDataUrl}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
              <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3 self-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100`}>
                <span className="font-heading text-xs font-bold tracking-wider">
                  {categoryLabel}
                </span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-cream mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                {truncatedTitle}
              </h3>
              {displayDescription && (
                <p className="font-body text-sm text-cream/90 mb-4 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                  {displayDescription}
                </p>
              )}
              
              {/* Price */}
              {post.price && (
                <div className="flex items-baseline gap-2 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-250">
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

              <div className="bg-cream text-black px-4 py-2 inline-block self-start border-2 border-cream font-heading text-sm font-bold uppercase transform group-hover:scale-110 transition-transform duration-300 delay-300">
                SHOP NOW
              </div>
            </div>
          </div>
        )}
      </Link>
    );
  }

  // DEFAULT (Design Work, Food) - Clean Card
  return (
    <Link
      href={href}
      className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-cream-200 animate-pulse" />
          )}
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            placeholder={blurDataUrl ? 'blur' : 'empty'}
            blurDataURL={blurDataUrl}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover Overlay - Gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <div className={`inline-block ${categoryColor} text-cream px-3 py-1 mb-3 self-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100`}>
              <span className="font-heading text-xs font-bold tracking-wider">
                {categoryLabel}
              </span>
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-cream mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
              {truncatedTitle}
            </h3>
            {displayDescription && (
              <p className="font-body text-sm text-cream/90 mb-4 line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                {displayDescription}
              </p>
            )}
            <div className="bg-cream text-black px-4 py-2 inline-block self-start border-2 border-cream font-heading text-sm font-bold uppercase transform group-hover:scale-110 transition-transform duration-300 delay-250">
              {post.ctaText || 'VIEW'}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

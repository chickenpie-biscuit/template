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
  author?: string;
  // Design Work fields
  client?: string;
  projectYear?: string;
  // Merch Drops fields
  stock?: number;
  limitedQuantity?: boolean;
  dropDate?: string;
  productType?: string;
}

interface FeedPostCardProps {
  post: FeedPost;
}

const categoryLabels: Record<string, string> = {
  'design-work': 'CASE STUDY',
  'art': 'GALLERY',
  'merch-drops': 'DROP',
  'prompt-week': 'PROMPT OF THE WEEK',
  'chronicles': 'CHICKEN CHRONICLES',
  'tool-tuesday': 'TOOL TUESDAY',
  'solopreneur': 'SOLOPRENEUR SUNDAYS',
  'sunday-swings': 'SUNDAY SWINGS',
};

const categoryColors: Record<string, string> = {
  'design-work': 'bg-teal',
  'art': 'bg-black',
  'merch-drops': 'bg-red',
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


  // ART - Museum Gallery Card
  if (category === 'art') {
    return (
      <Link
        href={href}
        className="group block bg-white p-3 md:p-5 shadow-sm hover:shadow-xl transition-all duration-500 relative"
      >
        {/* Gallery Plaque - Top */}
        <div className="mb-4 border-b border-black/5 pb-2 flex justify-between items-center">
          <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-black/40">
            Original Art
          </span>
          <span className="font-mono text-[10px] text-black/30">
            001
          </span>
        </div>

        {/* Frame effect */}
        <div className="bg-cream-50 p-4 md:p-8 flex items-center justify-center">
          {imageUrl && (
            <div className="relative w-full h-auto min-h-[200px] flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-cream-200 animate-pulse" />
              )}
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                width={600}
                height={800}
                className="w-auto h-auto max-w-full max-h-[400px] object-contain shadow-md group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-700 ease-out"
                placeholder={blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={blurDataUrl}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          )}
        </div>
        
        {/* Minimal Title - Bottom */}
        <div className="mt-4 text-center">
          <h3 className="font-heading text-lg uppercase tracking-wide text-black font-bold group-hover:text-black/60 transition-colors">
            {post.title}
          </h3>
        </div>
      </Link>
    );
  }

  // MERCH DROPS - Hype Drop Card (Supreme Style)
  if (category === 'merch-drops') {
    const isLowStock = post.stock !== undefined && post.stock > 0 && post.stock <= 10;
    const isSoldOut = post.stock !== undefined && post.stock <= 0;
    
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-black hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.8)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
      >
        {/* LIMITED Badge */}
        {post.limitedQuantity && (
          <div className="absolute top-4 left-4 bg-red text-white px-3 py-1 border border-white font-heading text-[10px] font-bold uppercase tracking-widest z-20 rotate-[-2deg]">
            Limited
          </div>
        )}

        {/* Product Image on White BG */}
        {imageUrl && (
          <div className="relative w-full aspect-square bg-white flex items-center justify-center p-8 border-b-2 border-black">
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
          </div>
        )}

        {/* Product Details on Black BG */}
        <div className="p-6 bg-black text-white">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className={`${categoryColor} text-white px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-widest`}>
              {categoryLabel}
            </span>
            {isLowStock && (
              <span className="text-red text-[10px] font-heading font-bold uppercase tracking-wider">
                {post.stock} Left
              </span>
            )}
            {isSoldOut && (
              <span className="text-white/40 text-[10px] font-heading font-bold uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg md:text-xl font-bold uppercase text-white mb-2 line-clamp-2 leading-tight">
            {truncatedTitle}
          </h3>

          {/* Price */}
          {post.price && (
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-heading text-2xl font-bold text-white">
                ${post.price}
              </span>
              {post.originalPrice && (
                <span className="font-heading text-sm line-through text-white/40">
                  ${post.originalPrice}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-xs text-white/70 mb-4 line-clamp-2">
              {displayDescription}
            </p>
          )}

          {/* CTA */}
          <div className="bg-white text-black px-4 py-2 text-center border-2 border-white font-heading text-xs font-bold uppercase group-hover:bg-red group-hover:text-white group-hover:border-red transition-colors">
            {isSoldOut ? 'SOLD OUT' : 'SHOP NOW'}
          </div>
        </div>
      </Link>
    );
  }

  // DESIGN WORK - Case Study Card
  if (category === 'design-work') {
    return (
      <Link
        href={href}
        className="group block border-2 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,221,221,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
      >
        {/* Hero Image */}
        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-black">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-cream-200 animate-pulse" />
            )}
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            {/* Category Badge on Image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-teal" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-teal">
                {categoryLabel}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 bg-white">
          {/* Title */}
          <h3 className="font-heading text-2xl font-bold uppercase text-black mb-3 leading-tight line-clamp-2 group-hover:text-teal transition-colors">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-sm text-black/70 mb-4 line-clamp-3 leading-relaxed">
              {displayDescription}
            </p>
          )}

          {/* Meta Info (if client/year available) */}
          <div className="flex items-center gap-4 text-xs font-heading uppercase tracking-wider text-black/40 mb-4">
            {(post as any).client && (
              <span>Client: {(post as any).client}</span>
            )}
            {(post as any).projectYear && (
              <>
                <span>•</span>
                <span>{(post as any).projectYear}</span>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="inline-block px-4 py-2 border-2 border-teal bg-teal text-black font-heading text-xs font-bold uppercase group-hover:bg-black group-hover:text-teal group-hover:border-black transition-colors">
            View Case Study
          </div>
        </div>
      </Link>
    );
  }

  // DEFAULT (fallback) - Simple Card
  return (
    <Link
      href={href}
      className="group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {imageUrl && (
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-cream-200 animate-pulse" />
          )}
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            placeholder={blurDataUrl ? 'blur' : 'empty'}
            blurDataURL={blurDataUrl}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold uppercase mb-2">{truncatedTitle}</h3>
        {displayDescription && (
          <p className="font-body text-sm text-black/70 line-clamp-3">{displayDescription}</p>
        )}
      </div>
    </Link>
  );
}

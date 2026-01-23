'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { useState, memo, useMemo } from 'react';

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
  'nom-nom': 'NOM NOM',
};

const categoryColors: Record<string, string> = {
  'design-work': 'bg-goldenrod',
  'art': 'bg-black',
  'merch-drops': 'bg-red',
  'prompt-week': 'bg-goldenrod',
  'chronicles': 'bg-goldenrod',
  'tool-tuesday': 'bg-teal',
  'solopreneur': 'bg-teal',
  'sunday-swings': 'bg-goldenrod',
  'nom-nom': 'bg-orange-500',
};

function FeedPostCard({ post }: FeedPostCardProps) {
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
  
  // Always link to post detail page (CTA links will be shown inside the post)
  const href = post._type === 'post' ? `/blog/${post.slug}` : `/feed/${post.slug}`;
  
  // Truncate title for display
  const truncatedTitle = post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title;

  // PROMPT OF THE WEEK - Clean Tech Aesthetic
  if (category === 'prompt-week') {
    return (
      <Link
        href={href}
        className="group block border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="relative p-8 min-h-[400px] flex flex-col bg-cream">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-goldenrod" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-goldenrod">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-black leading-tight mb-4 flex-1">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-sm text-black/70 mb-4 line-clamp-3">
              {displayDescription}
            </p>
          )}

          {/* Code Preview */}
          <div className="bg-black border-2 border-black p-3 font-mono text-xs text-goldenrod">
            {"<AI_PROMPT>"} ...
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-goldenrod opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center">
            <p className="font-heading text-black font-bold uppercase text-lg mb-4">
              Copy The Winning Prompt
            </p>
            <div className="bg-black text-goldenrod px-6 py-3 border-2 border-black font-heading text-sm font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
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
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-100">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-goldenrod/10 animate-pulse" />
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
            {/* Subtle vignette for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
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
        className="group block border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(218,165,32,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Image with overlay text effect */}
        {imageUrl && (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
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
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Category badge on image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="bg-goldenrod px-3 py-1.5 border-2 border-black">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-black">
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-heading text-2xl font-bold uppercase text-white leading-tight drop-shadow-lg">
                {truncatedTitle}
              </h3>
            </div>
          </div>
        )}

        {/* Content section */}
        <div className="p-5 bg-cream border-t-4 border-black">
          {/* Description */}
          {displayDescription && (
            <p className="font-body text-black/70 mb-4 line-clamp-2 text-sm leading-relaxed">
              {displayDescription}
            </p>
          )}

          {/* Footer with meta and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black/50 font-heading text-[10px] uppercase tracking-wider">
              <span>Essay</span>
              <span>•</span>
              <span>5 min</span>
            </div>
            <div className="bg-black text-goldenrod px-3 py-1.5 font-heading text-xs font-bold uppercase group-hover:bg-goldenrod group-hover:text-black transition-colors">
              Read
            </div>
          </div>
        </div>
      </Link>
    );
  }


  // NOM NOM - Recipe Card (Food Blog Style)
  if (category === 'nom-nom') {
    return (
      <Link
        href={href}
        className="group block border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Food Image */}
        {imageUrl && (
          <div className="relative w-full aspect-square overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-orange-100 animate-pulse" />
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
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 border-2 border-black">
              <span className="font-heading text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                🍳 {categoryLabel}
              </span>
            </div>

            {/* Recipe Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-3 text-white/90 text-xs font-heading uppercase tracking-wider">
                {(post as any).prepTime && (
                  <span className="flex items-center gap-1">
                    ⏱️ {(post as any).prepTime}
                  </span>
                )}
                {(post as any).difficulty && (
                  <span className="bg-white/20 px-2 py-0.5 rounded">
                    {(post as any).difficulty}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 bg-cream">
          {/* Title */}
          <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-black leading-tight mb-2 group-hover:text-orange-600 transition-colors">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-sm text-black/70 mb-4 line-clamp-2">
              {displayDescription}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black/50 font-heading text-[10px] uppercase tracking-wider">
              {(post as any).cuisine && <span>{(post as any).cuisine}</span>}
              {(post as any).servings && (
                <>
                  <span>•</span>
                  <span>{(post as any).servings}</span>
                </>
              )}
            </div>
            <div className="bg-orange-500 text-white px-3 py-1.5 font-heading text-xs font-bold uppercase group-hover:bg-black transition-colors">
              View Recipe
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ART - Clean Gallery Card (Large Image, No Background)
  if (category === 'art') {
    return (
      <Link
        href={href}
        className="group block hover:-translate-y-2 transition-all duration-500 relative"
      >
        {/* Large Art Image - No Background, Full Size */}
        {imageUrl && (
          <div className="relative w-full aspect-[3/4] mb-4">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-transparent animate-pulse" />
            )}
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              fill
              className="object-contain drop-shadow-2xl group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)] group-hover:scale-[1.02] transition-all duration-700 ease-out"
              placeholder={blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={blurDataUrl}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}
        
        {/* Centered Title Below */}
        <div className="text-center px-2">
          <h3 className="font-heading text-lg md:text-xl uppercase tracking-wide text-black font-bold group-hover:text-black/60 transition-colors">
            {post.title}
          </h3>
          <p className="font-heading text-[10px] uppercase tracking-widest text-black/40 mt-1">
            {categoryLabel}
          </p>
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
        className="group block border-2 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(218,165,32,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
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
              <div className="w-8 h-0.5 bg-goldenrod" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-goldenrod">
                {categoryLabel}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 bg-white">
          {/* Title */}
          <h3 className="font-heading text-2xl font-bold uppercase text-black mb-3 leading-tight line-clamp-2 group-hover:text-goldenrod transition-colors">
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
          <div className="inline-block px-4 py-2 border-2 border-goldenrod bg-goldenrod text-black font-heading text-xs font-bold uppercase group-hover:bg-black group-hover:text-goldenrod group-hover:border-black transition-colors">
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

// Memoize to prevent unnecessary re-renders
export default memo(FeedPostCard, (prevProps, nextProps) => {
  return prevProps.post._id === nextProps.post._id;
});

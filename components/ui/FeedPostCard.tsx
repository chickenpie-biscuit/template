'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { useState, memo, useRef } from 'react';
import { MapPin, Flag, Star, Heart } from 'lucide-react';
import LikeButton from './LikeButton';

interface FeedPost {
  _id: string;
  _type?: string;
  title: string;
  slug: string;
  category?: string;
  featuredImage?: any;
  featuredVideo?: string; // URL from GROQ query
  videoUrl?: string;
  mediaType?: 'image' | 'video' | 'external-video';
  mainImage?: any;
  description?: string;
  excerpt?: string;
  body?: any[]; // For reading time estimation
  ctaText?: string;
  ctaLink?: string;
  price?: number;
  originalPrice?: number;
  author?: string;
  likes?: number;
  // Design Work fields
  client?: string;
  projectYear?: string;
  // Merch Drops fields (synced with Product schema)
  shortDescription?: string;
  stock?: number;
  limitedQuantity?: boolean;
  dropDate?: string;
  productType?: string;
  sizes?: string[];
  sku?: string;
  downloadUrl?: string;
  productGallery?: any[];
  // Course Review fields
  courseLocation?: string;
  courseRating?: number;
  courseDifficulty?: number;
  courseConditions?: number;
}

// Helper to get YouTube/Vimeo embed URL
const getEmbedUrl = (url: string): string | null => {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${youtubeMatch[1]}&controls=0&showinfo=0`;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`;
  }
  
  return null;
};

interface FeedPostCardProps {
  post: FeedPost;
}

const categoryLabels: Record<string, string> = {
  'design-work': 'DESIGN STUFF',
  'art': 'GALLERY',
  'merch-drops': 'DROP',
  'prompt-week': 'PROMPT OF THE WEEK',
  'chronicles': 'CHICKEN CHRONICLES',
  'tool-tuesday': 'TOOL TUESDAY',
  'solopreneur': 'SOLOPRENEUR SUNDAYS',
  'sunday-swings': 'SUNDAY SWINGS',
  'nom-nom': 'NOM NOM',
  'quotes': 'QUOTE',
  'course-review': 'COURSE REVIEW',
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
  'quotes': 'bg-black/80',
  'course-review': 'bg-emerald-700',
};

function FeedPostCard({ post }: FeedPostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle both feedPost (featuredImage) and regular post (mainImage)
  const image = post.featuredImage || post.mainImage;
  const imageUrl = image
    ? urlFor(image).width(800).height(1200).url()
    : null;
  
  const blurDataUrl = image
    ? urlFor(image).width(20).height(20).blur(10).url()
    : undefined;

  // Determine if we should show video instead of image
  const hasUploadedVideo = !!post.featuredVideo;
  const hasExternalVideo = !!post.videoUrl;
  const showVideo = post.mediaType === 'video' || post.mediaType === 'external-video' || hasUploadedVideo || hasExternalVideo;
  
  // Get video URL
  const videoSrc = post.featuredVideo || null;
  const externalEmbedUrl = post.videoUrl ? getEmbedUrl(post.videoUrl) : null;

  // For blog posts, default category to 'thoughts'
  const category = typeof post.category === 'string' ? post.category : 'thoughts';
  const categoryLabel = categoryLabels[category] || category.toUpperCase();
  const categoryColor = categoryColors[category] || 'bg-black';
  
  // Use excerpt if description is not available (for blog posts)
  const displayDescription = post.description || post.excerpt;
  
  // Always link to post detail page (CTA links will be shown inside the post)
  const href = post._type === 'post' ? `/blog/${post.slug}` : `/feed/${post.slug}`;
  
  // Truncate title for display
  const truncatedTitle = post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title;

  // Video thumbnail component
  const VideoThumbnail = ({ className = '', aspectClass = 'aspect-[4/3]' }: { className?: string; aspectClass?: string }) => {
    if (videoSrc) {
      // Uploaded video - autoplay muted loop
      return (
        <div className={`relative w-full ${aspectClass} overflow-hidden ${className}`}>
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      );
    }
    
    if (externalEmbedUrl) {
      // External video (YouTube/Vimeo) - iframe embed
      return (
        <div className={`relative w-full ${aspectClass} overflow-hidden ${className}`}>
          <iframe
            src={externalEmbedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
      );
    }
    
    return null;
  };

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
            <p className="font-body text-xs text-black/70 mb-4 line-clamp-3">
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

        {/* Media - Video or Image */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-100">
            <VideoThumbnail aspectClass="aspect-[4/3]" />
          </div>
        ) : imageUrl ? (
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
        ) : null}

        <div className="p-6 bg-cream">
          <h3 className="font-heading text-2xl font-bold uppercase text-black leading-tight mb-3">
            {truncatedTitle}
          </h3>
          {displayDescription && (
            <p className="font-body text-xs text-black/70 mb-4 line-clamp-3">
              {displayDescription}
            </p>
          )}
          <div className="bg-black text-goldenrod px-4 py-2 inline-block border-2 border-black font-heading text-xs font-bold uppercase group-hover:bg-goldenrod group-hover:text-black transition-colors">
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
        {/* Media - Video or Image */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-black border-b-4 border-black">
            <VideoThumbnail aspectClass="aspect-[4/3]" />
            {/* Category Badge on video */}
            <div className="absolute top-4 left-4 bg-teal text-black px-3 py-1.5 border-2 border-black z-10">
              <span className="font-heading text-xs font-bold uppercase tracking-wider">
                {categoryLabel}
              </span>
            </div>
          </div>
        ) : imageUrl ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-black border-b-4 border-black">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-teal/10 animate-pulse" />
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
            
            {/* Category Badge on image */}
            <div className="absolute top-4 left-4 bg-teal text-black px-3 py-1.5 border-2 border-black">
              <span className="font-heading text-xs font-bold uppercase tracking-wider">
                {categoryLabel}
              </span>
            </div>
          </div>
        ) : null}

        <div className="p-5 bg-cream">
          <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-black leading-tight mb-2 group-hover:text-teal transition-colors">
            {truncatedTitle}
          </h3>

          {displayDescription && (
            <p className="font-body text-xs text-black/70 mb-4 line-clamp-2">
              {displayDescription}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="text-black/50 font-heading text-[10px] uppercase tracking-wider">
              Tool Review
            </div>
            <div className="bg-black text-teal px-3 py-1.5 font-heading text-xs font-bold uppercase group-hover:bg-teal group-hover:text-black transition-colors">
              Read Review
            </div>
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
            <p className="font-body text-xs text-cream/70 mb-6 line-clamp-3">
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

          <div className="bg-teal text-black px-4 py-2 inline-block border-2 border-teal font-heading text-xs font-bold uppercase group-hover:bg-cream group-hover:border-cream transition-colors">
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
        {/* Media with overlay text effect - Video or Image */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <VideoThumbnail aspectClass="aspect-[4/3]" />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <div className="bg-goldenrod px-3 py-1.5 border-2 border-black">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-black">
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <h3 className="font-heading text-2xl font-bold uppercase text-white leading-tight drop-shadow-lg">
                {truncatedTitle}
              </h3>
            </div>
          </div>
        ) : imageUrl ? (
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
        ) : null}

        {/* Content section */}
        <div className="p-5 bg-cream border-t-4 border-black">
          {/* Description */}
          {displayDescription && (
            <p className="font-body text-xs text-black/70 mb-4 line-clamp-2 leading-relaxed">
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


  // COURSE REVIEW - Golf Card
  if (category === 'course-review') {
    return (
      <Link
        href={href}
        className="group block border-2 border-emerald-900 bg-emerald-50 hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Media - Video or Image */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <div className="relative w-full aspect-video overflow-hidden">
            <VideoThumbnail aspectClass="aspect-video" />
            
            {/* Rating Badge */}
            {post.courseRating && (
              <div className="absolute top-4 right-4 bg-white text-emerald-900 px-3 py-1 border-2 border-emerald-900 font-heading font-bold flex items-center gap-1 shadow-md z-10">
                <Star className="w-3 h-3 fill-emerald-900" />
                <span>{post.courseRating}/10</span>
              </div>
            )}
          </div>
        ) : imageUrl ? (
          <div className="relative w-full aspect-video overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-emerald-100 animate-pulse" />
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
            
            {/* Rating Badge */}
            {post.courseRating && (
              <div className="absolute top-4 right-4 bg-white text-emerald-900 px-3 py-1 border-2 border-emerald-900 font-heading font-bold flex items-center gap-1 shadow-md">
                <Star className="w-3 h-3 fill-emerald-900" />
                <span>{post.courseRating}/10</span>
              </div>
            )}
          </div>
        ) : null}

        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Flag className="w-4 h-4 text-emerald-700" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-emerald-900">
              {categoryLabel}
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold uppercase text-black leading-tight mb-2">
            {truncatedTitle}
          </h3>

          {post.courseLocation && (
            <div className="flex items-center gap-2 mb-4 text-emerald-800/60 font-heading text-xs uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              {post.courseLocation}
            </div>
          )}

          {displayDescription && (
            <p className="font-body text-xs text-emerald-900/70 line-clamp-2 mb-4">
              {displayDescription}
            </p>
          )}

          <div className="bg-emerald-900 text-white px-4 py-2 text-center font-heading text-xs font-bold uppercase hover:bg-emerald-800 transition-colors">
            Read Review
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
        {/* Food Media - Video or Image */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <div className="relative w-full aspect-square overflow-hidden">
            <VideoThumbnail aspectClass="aspect-square" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 border-2 border-black z-10">
              <span className="font-heading text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                🍳 {categoryLabel}
              </span>
            </div>

            {/* Recipe Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
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
        ) : imageUrl ? (
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
        ) : null}

        {/* Content */}
        <div className="p-5 bg-cream">
          {/* Title */}
          <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-black leading-tight mb-2 group-hover:text-orange-600 transition-colors">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-xs text-black/70 mb-4 line-clamp-2">
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

  // QUOTES - Minimal Quote Card (Image displayed as-is, or text on cream)
  if (category === 'quotes') {
    // Only navigate if CTA link is provided
    const hasLink = post.ctaLink && post.ctaLink.trim() !== '';
    
    // Calculate font size based on text length - more aggressive scaling
    const quoteText = post.title || '';
    const charCount = quoteText.length;
    
    // Dynamic font sizing: aggressive scaling to always fit in square
    const getFontSizeClass = () => {
      if (charCount <= 10) return 'text-3xl md:text-4xl'; // Very short
      if (charCount <= 25) return 'text-2xl md:text-3xl'; // Short
      if (charCount <= 50) return 'text-xl md:text-2xl'; // Medium-short
      if (charCount <= 80) return 'text-lg md:text-xl'; // Medium
      if (charCount <= 120) return 'text-base md:text-lg'; // Medium-long
      if (charCount <= 180) return 'text-sm md:text-base'; // Long
      return 'text-xs md:text-sm'; // Very long
    };
    
    // Has uploaded image?
    const hasImage = !!imageUrl;
    
    // If image is uploaded, show ONLY the image (fills the card)
    if (hasImage) {
      const imageCard = (
        <div className="group relative aspect-square overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-cream animate-pulse" />
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
          {/* Like Button Overlay */}
          <div className="absolute bottom-3 right-3 z-10">
            <LikeButton 
              postId={post._id} 
              initialLikes={post.likes || 0} 
              variant="card" 
              size="sm"
            />
          </div>
        </div>
      );
      
      // If has link, wrap in Link component
      if (hasLink) {
        return (
          <Link
            href={post.ctaLink!}
            target={post.ctaLink!.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="block"
          >
            {imageCard}
          </Link>
        );
      }
      
      return <div>{imageCard}</div>;
    }
    
    // No image - show text quote on cream background
    const cardContent = (
      <div className="group relative aspect-square flex flex-col justify-center items-center p-6 overflow-hidden bg-cream">
        {/* Quote Content - Constrained to fit */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center w-full h-full px-2">
          {/* Quote Text (Title) - Scales down to fit */}
          <blockquote className={`font-heading font-black leading-[1.1] uppercase tracking-tight break-words hyphens-auto ${getFontSizeClass()} text-black`}>
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          
          {/* Attribution (Description) - At bottom */}
          {displayDescription && (
            <cite className="absolute bottom-6 left-6 right-6 font-body text-xs not-italic text-center truncate text-black/60">
              — {displayDescription}
            </cite>
          )}
          
          {/* CTA if link exists - appears on hover */}
          {hasLink && (
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-block px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-wider bg-black text-white">
                {post.ctaText || 'Read'}
              </span>
            </div>
          )}
        </div>
        
        {/* Like Button */}
        <div className="absolute top-3 right-3 z-10">
          <LikeButton 
            postId={post._id} 
            initialLikes={post.likes || 0} 
            variant="card" 
            size="sm"
          />
        </div>
      </div>
    );

    // If has link, wrap in Link component
    if (hasLink) {
      return (
        <Link
          href={post.ctaLink!}
          target={post.ctaLink!.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </Link>
      );
    }

    // No link - just render the card (not clickable)
    return <div>{cardContent}</div>;
  }

  // ART - Clean Gallery Card (Full Artwork, No Cropping)
  if (category === 'art') {
    // Check if post has video (either uploaded or external)
    const hasVideo = (post as any).featuredVideo || (post as any).videoUrl;
    const videoUrl = (post as any).featuredVideo || (post as any).videoUrl;
    
    return (
      <div className="group relative">
        <Link
          href={href}
          className="block hover:-translate-y-2 transition-all duration-500"
        >
          {/* Large Art Media - Video or Image (transparent background for PNGs) */}
          {showVideo && (videoSrc || externalEmbedUrl) ? (
            <div className="relative w-full aspect-square mb-4 overflow-hidden">
              <VideoThumbnail aspectClass="aspect-square" />
            </div>
          ) : imageUrl ? (
            <div className="relative w-full mb-4 overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-black/5 animate-pulse aspect-square" />
              )}
              {/* Use natural image sizing - no background for transparent PNGs */}
              <div className="relative w-full" style={{ minHeight: '200px' }}>
                <Image
                  src={imageUrl}
                  alt={post.featuredImage?.alt || post.title}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out drop-shadow-lg group-hover:drop-shadow-2xl"
                  placeholder={blurDataUrl ? 'blur' : 'empty'}
                  blurDataURL={blurDataUrl}
                  onLoad={() => setImageLoaded(true)}
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
              </div>
            </div>
          ) : null}
          
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
        
        {/* Like Button - positioned outside the link */}
        <div className="flex justify-center mt-3">
          <LikeButton 
            postId={post._id} 
            initialLikes={post.likes || 0} 
            variant="minimal" 
            size="sm"
          />
        </div>
      </div>
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

        {/* Product Media - Video or Image on White BG */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <div className="relative w-full aspect-square bg-white border-b-2 border-black overflow-hidden">
            <VideoThumbnail aspectClass="aspect-square" />
          </div>
        ) : imageUrl ? (
          <div className="relative w-full aspect-square bg-white border-b-2 border-black overflow-hidden">
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
        ) : null}

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

  // DESIGN WORK - Design Stuff Card (Improved)
  if (category === 'design-work') {
    return (
      <Link
        href={href}
        className="group block bg-white hover:shadow-[12px_12px_0px_0px_rgba(218,165,32,1)] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
      >
        {/* Hero Media - Video or Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-goldenrod/20 to-black/10">
          {showVideo && (videoSrc || externalEmbedUrl) ? (
            <>
              <VideoThumbnail aspectClass="aspect-[4/3]" />
              {/* Category Badge - Floating */}
              <div className="absolute top-3 left-3 bg-goldenrod px-3 py-1 z-10">
                <span className="font-heading text-[10px] font-black uppercase tracking-wider text-black">
                  {categoryLabel}
                </span>
              </div>
            </>
          ) : imageUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-cream animate-pulse" />
              )}
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                placeholder={blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={blurDataUrl}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge - Floating */}
              <div className="absolute top-3 left-3 bg-goldenrod px-3 py-1">
                <span className="font-heading text-[10px] font-black uppercase tracking-wider text-black">
                  {categoryLabel}
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-4xl text-goldenrod/30">✦</span>
            </div>
          )}
        </div>

        {/* Content - Clean and minimal */}
        <div className="p-5 bg-white border-t-4 border-goldenrod">
          {/* Title */}
          <h3 className="font-heading text-lg md:text-xl font-bold text-black mb-2 leading-tight line-clamp-2 group-hover:text-goldenrod transition-colors">
            {truncatedTitle}
          </h3>

          {/* Description */}
          {displayDescription && (
            <p className="font-body text-xs text-black/60 mb-4 line-clamp-2 leading-relaxed">
              {displayDescription}
            </p>
          )}

          {/* Footer with CTA */}
          <div className="flex items-center justify-between">
            {/* Meta Info */}
            <div className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-wider text-black/40">
              {(post as any).client && (
                <span>{(post as any).client}</span>
              )}
              {(post as any).projectYear && (
                <>
                  <span>•</span>
                  <span>{(post as any).projectYear}</span>
                </>
              )}
              </div>

            {/* CTA Arrow */}
            <div className="flex items-center gap-2 text-goldenrod group-hover:text-black transition-colors">
              <span className="font-heading text-xs font-bold uppercase tracking-wider">Read Article</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // DEFAULT (fallback) - Simple Card
  return (
    <div className="group relative">
      <Link
        href={href}
        className="block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Show video if available, otherwise image */}
        {showVideo && (videoSrc || externalEmbedUrl) ? (
          <VideoThumbnail className="bg-black" aspectClass="aspect-[3/4]" />
        ) : imageUrl ? (
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
        ) : null}
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold uppercase mb-2">{truncatedTitle}</h3>
          {displayDescription && (
            <p className="font-body text-xs text-black/70 line-clamp-3">{displayDescription}</p>
          )}
        </div>
      </Link>
      
      {/* Like Button - positioned at bottom right */}
      <div className="absolute bottom-3 right-3 z-10">
        <LikeButton 
          postId={post._id} 
          initialLikes={post.likes || 0} 
          variant="minimal" 
          size="sm"
        />
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(FeedPostCard, (prevProps, nextProps) => {
  return prevProps.post._id === nextProps.post._id;
});

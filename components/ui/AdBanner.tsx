'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AdBanner } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdBannerProps {
  banners: AdBanner[];
  placement?: 'header' | 'sidebar' | 'footer' | 'inline';
  variant?: 'full' | 'card' | 'sticky' | 'inline' | 'feedpost' | 'shop';
  className?: string;
  dismissible?: boolean;
}

/**
 * AdBanner Component
 * 
 * Banner display is controlled by Sanity CMS:
 * 
 * PLACEMENT (set in Sanity):
 * - header  → Shows in sticky announcement bar (top of page)
 * - footer  → Shows as full-width banner above footer
 * - inline  → Shows between feed posts, on shop page, after blog content
 * - sidebar → Shows as card-style banner after post content
 * 
 * VARIANTS:
 * - 'sticky'   → Text-only announcement bar (no image required)
 * - 'full'     → Full-width image banner with overlay
 * - 'card'     → Card-style with image and title
 * - 'inline'   → Horizontal banner with CTA
 * - 'feedpost' → Looks like a FeedPostCard (blends with masonry feed)
 * 
 * If no image is assigned (except for sticky), the banner will NOT render.
 */
export default function AdBannerComponent({ 
  banners, 
  placement, 
  variant = 'full',
  className = '',
  dismissible = false,
}: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter by placement if provided, then by active and date
  const now = new Date();
  const filteredBanners = banners
    .filter((banner) => {
      // Must be active
      if (!banner.active) return false;
      
      // Must match placement if specified
      if (placement && banner.placement !== placement) return false;
      
      // Check date range
      if (banner.startDate && new Date(banner.startDate) > now) return false;
      if (banner.endDate && new Date(banner.endDate) < now) return false;
      
      // For non-sticky variants, require an image with an actual asset
      if (variant !== 'sticky' && (!banner.image || !banner.image.asset)) return false;
      
      // Must have at least a title
      if (!banner.title) return false;
      
      return true;
    })
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Rotate banners if multiple
  useEffect(() => {
    if (filteredBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredBanners.length);
    }, 8000); // Rotate every 8 seconds
    return () => clearInterval(interval);
  }, [filteredBanners.length]);

  // Don't render if no valid banners or user dismissed
  if (!filteredBanners.length || dismissed) return null;

  const banner = filteredBanners[currentIndex];
  
  // Generate image URLs for different sizes (only if asset exists)
  const hasImageAsset = banner.image && (banner.image as any).asset;
  const imageUrl = hasImageAsset
    ? urlFor(banner.image as any).width(1400).height(400).url()
    : null;

  const feedpostImageUrl = hasImageAsset
    ? urlFor(banner.image as any).width(800).height(1200).url()
    : null;

  // Header/Announcement Bar Style - TEXT ONLY (no image required)
  if (variant === 'sticky') {
    return (
      <div className={`relative bg-black text-cream ${className}`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-4">
          {banner.link ? (
            <Link 
              href={banner.link} 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              target={banner.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              <span className="font-heading font-bold uppercase text-xs tracking-wider text-goldenrod">
                {banner.title}
              </span>
              <span className="font-body text-sm text-cream/80">→</span>
            </Link>
          ) : (
            <span className="font-heading font-bold uppercase text-xs tracking-wider text-goldenrod">
              {banner.title}
            </span>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  // For all other variants, image is required
  if (!imageUrl) return null;

  // FEEDPOST VARIANT - Clean ad display for masonry feed
  // Shows full artwork without overlays, with sponsored badge and CTA below
  if (variant === 'feedpost') {
    const content = (
      <div className={`group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}>
        {/* Full Image - NO overlays, shows complete artwork */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-cream">
          <Image
            src={feedpostImageUrl || imageUrl}
            alt={banner.image?.alt || banner.title}
            fill
            className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Minimal footer - Sponsored badge + Learn More only */}
        <div className="px-4 py-3 bg-cream border-t-2 border-black">
          <div className="flex items-center justify-between">
            {/* Sponsored Badge */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-goldenrod"></div>
              <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-black/60">
                Sponsored
              </span>
            </div>
            
            {/* Learn More CTA */}
            <div className="bg-black text-cream px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-wider group-hover:bg-goldenrod group-hover:text-black transition-colors">
              Learn More →
            </div>
          </div>
        </div>
      </div>
    );

    if (banner.link) {
      return (
        <Link
          href={banner.link}
          className="block"
          target={banner.link.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }
    return content;
  }

  // Full Width Banner (for footer placements) - REQUIRES IMAGE
  if (variant === 'full') {
    const content = (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <div className="relative w-full aspect-[4/1] md:aspect-[6/1] bg-black">
          <Image
            src={imageUrl}
            alt={banner.image?.alt || banner.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay with title */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="font-heading font-bold uppercase text-lg md:text-2xl text-cream drop-shadow-lg">
                {banner.title}
              </p>
            </div>
          </div>
        </div>
        {/* Banner indicator dots */}
        {filteredBanners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {filteredBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-goldenrod' : 'bg-cream/40'
                }`}
                aria-label={`Go to banner ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );

    if (banner.link) {
      return (
        <Link
          href={banner.link}
          className="block"
          target={banner.link.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }
    return content;
  }

  // Card Style (for sidebar) - REQUIRES IMAGE
  if (variant === 'card') {
    const content = (
      <div className={`relative overflow-hidden border-2 border-black bg-cream ${className}`}>
        <div className="relative w-full aspect-[3/1] bg-black">
          <Image
            src={imageUrl}
            alt={banner.image?.alt || banner.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-4 bg-goldenrod">
          <p className="font-heading font-bold uppercase text-sm text-black text-center">
            {banner.title}
          </p>
        </div>
        {/* Sponsored label */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-cream text-[10px] font-heading uppercase tracking-wider">
          Sponsored
        </div>
      </div>
    );

    if (banner.link) {
      return (
        <Link
          href={banner.link}
          className="block hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
          target={banner.link.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }
    return content;
  }

  // Inline Banner (between content) - REQUIRES IMAGE
  if (variant === 'inline') {
    const content = (
      <div className={`relative overflow-hidden bg-black ${className}`}>
        <div className="relative w-full aspect-[4/1] md:aspect-[5/1]">
          <Image
            src={imageUrl}
            alt={banner.image?.alt || banner.title}
            fill
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70 flex items-center">
            <div className="px-6 md:px-12 w-full flex items-center justify-between">
              <div>
                <p className="font-heading font-bold uppercase text-xs tracking-wider text-goldenrod mb-1">
                  Sponsored
                </p>
                <p className="font-heading font-bold uppercase text-lg md:text-xl text-cream">
                  {banner.title}
                </p>
              </div>
              {banner.link && (
                <span className="hidden md:block px-4 py-2 bg-goldenrod text-black font-heading font-bold uppercase text-xs">
                  Learn More →
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (banner.link) {
      return (
        <Link
          href={banner.link}
          className="block"
          target={banner.link.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }
    return content;
  }

  // SHOP BANNER - Clean wide banner for shop page (5:1 ratio, 1400x280px recommended)
  // Full image display with minimal footer underneath
  if (variant === 'shop') {
    const content = (
      <div className={`relative overflow-hidden border-2 border-black ${className}`}>
        {/* Full Image - No overlays */}
        <div className="relative w-full aspect-[4/1] md:aspect-[5/1] bg-cream">
          <Image
            src={imageUrl}
            alt={banner.image?.alt || banner.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Minimal Footer - Sponsored left, Learn More right */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-cream border-t-2 border-black">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-goldenrod"></div>
            <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-black/50">
              Sponsored
            </span>
          </div>
          {banner.link && (
            <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-black hover:text-goldenrod transition-colors">
              Learn More →
            </span>
          )}
        </div>
      </div>
    );

    if (banner.link) {
      return (
        <Link
          href={banner.link}
          className="block hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
          target={banner.link.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }
    return content;
  }

  return null;
}

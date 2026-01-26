'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import { ShopBanner } from '@/types/sanity';

interface ShopBannerProps {
  banners: ShopBanner[];
  className?: string;
}

export default function ShopBannerComponent({ banners, className = '' }: ShopBannerProps) {
  // Filter to only show active banners within date range
  const now = new Date();
  const activeBanners = banners.filter((banner) => {
    if (!banner.active) return false;
    if (banner.startDate && new Date(banner.startDate) > now) return false;
    if (banner.endDate && new Date(banner.endDate) < now) return false;
    return true;
  });

  if (activeBanners.length === 0) return null;

  // Get the first active banner (or could implement rotation)
  const banner = activeBanners[0];
  const imageUrl = banner.image ? urlForImage(banner.image)?.url() : null;

  if (!imageUrl) return null;

  const content = (
    <div className={`group block border-2 border-black bg-cream hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}>
      {/* Image - Full artwork, no overlays */}
      <div className="relative w-full aspect-[5/1] overflow-hidden bg-black flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={banner.image?.alt || banner.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="100vw"
        />
      </div>
      
      {/* Content section underneath */}
      <div className="p-4 bg-cream border-t-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-2 text-black/50 font-heading text-[10px] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-goldenrod"></span>
          <span>Sponsored</span>
        </div>
        
        {banner.link && (
          <div className="bg-black text-goldenrod px-3 py-1.5 font-heading text-xs font-bold uppercase group-hover:bg-goldenrod group-hover:text-black transition-colors">
            Learn More →
          </div>
        )}
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

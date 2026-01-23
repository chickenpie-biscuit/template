'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '@/types/sanity';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  // Combine all possible image sources
  const allImages = [
    ...(product.images || []),
    ...(product.productGallery || []),
    product.featuredImage
  ].filter(Boolean);

  // Deduplicate images based on asset ref if possible, but simple filter(Boolean) covers most cases
  // Actually, let's just use the first available array or fallback
  
  const displayImages = (product.images && product.images.length > 0) 
    ? product.images 
    : (product.productGallery && product.productGallery.length > 0)
      ? product.productGallery
      : [product.featuredImage].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const mainImage = displayImages[activeImageIndex];
  const mainImageUrl = mainImage
    ? urlFor(mainImage as any).width(1000).height(1000).url()
    : '/images/placeholder.jpg';

  const isLimited = (product as any).limitedQuantity;
  const soldOut = product.stock !== undefined && product.stock <= 0;
  const hasDiscount = (product as any).originalPrice && (product as any).originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / (product as any).originalPrice) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group">
        <Image
          src={mainImageUrl}
          alt={mainImage?.alt || product.title}
          fill
          className={`object-contain p-8 group-hover:scale-105 transition-transform duration-500 ${soldOut ? 'grayscale opacity-60' : ''}`}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isLimited && (
            <span className="px-4 py-2 bg-red text-cream font-heading font-bold uppercase text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
              Limited
            </span>
          )}
          {hasDiscount && (
            <span className="px-4 py-2 bg-goldenrod text-black font-heading font-bold uppercase text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              -{discountPercent}% Off
            </span>
          )}
        </div>

        {soldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="px-8 py-4 bg-cream text-black font-heading font-bold uppercase text-xl border-4 border-black rotate-[-10deg]">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((image: any, index: number) => {
            const thumbUrl = urlFor(image).width(200).height(200).url();
            return (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square relative border-2 overflow-hidden cursor-pointer transition-all ${
                  index === activeImageIndex 
                    ? 'border-goldenrod ring-2 ring-goldenrod ring-offset-2' 
                    : 'border-black hover:border-goldenrod'
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={image.alt || `${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

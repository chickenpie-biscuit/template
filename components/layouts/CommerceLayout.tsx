'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Zap, Package, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';

interface CommerceLayoutProps {
  post: any;
}

export default function CommerceLayout({ post }: CommerceLayoutProps) {
  // Build gallery from productGallery or fallback to featuredImage
  const galleryImages = post.productGallery && post.productGallery.length > 0
    ? post.productGallery
    : post.featuredImage
    ? [post.featuredImage]
    : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  
  const activeImage = galleryImages[activeImageIndex];
  const imageUrl = activeImage
    ? urlFor(activeImage).width(1200).url()
    : null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const [timeUntilDrop, setTimeUntilDrop] = useState<string>('');
  const isUpcoming = post.dropDate && new Date(post.dropDate) > new Date();
  const isLimited = post.limitedQuantity;
  const stockLow = post.stock !== undefined && post.stock > 0 && post.stock <= 10;
  const soldOut = post.stock !== undefined && post.stock <= 0;

  // Handle add to cart
  const handleAddToCart = () => {
    if (soldOut || isUpcoming) return;
    
    // If product has sizes and no size is selected, alert user
    if (post.sizes && post.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addItem({
      id: post._id,
      name: post.title,
      price: post.price,
      image: imageUrl || '',
      size: selectedSize || undefined,
    });
  };

  // Countdown timer
  useEffect(() => {
    if (!isUpcoming) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dropTime = new Date(post.dropDate).getTime();
      const distance = dropTime - now;

      if (distance < 0) {
        setTimeUntilDrop('LIVE NOW');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeUntilDrop(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [post.dropDate, isUpcoming]);

  return (
    <article className="min-h-screen bg-black text-white">
      {/* Alert Banner - not sticky to avoid conflict with main header */}
      {isLimited && (
        <div className="bg-red text-white text-center py-3 px-4 border-b-2 border-white/20">
          <div className="flex items-center justify-center gap-2 font-heading text-xs font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4 animate-pulse" />
            <span>LIMITED EDITION DROP</span>
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Product Image Gallery with Pagination */}
        <div className="relative h-[70vh] lg:h-screen bg-white flex flex-col items-center justify-center lg:sticky lg:top-0 border-r-0 lg:border-r-2 border-white/20">
          {/* Back Button - positioned top right to avoid LIMITED badge */}
          <Link 
            href="/shop"
            className="absolute top-6 right-6 z-20 flex items-center gap-2 group"
          >
            <span className="font-heading font-bold uppercase text-xs tracking-widest text-black opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              Back
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-black bg-cream flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft size={16} className="rotate-180" />
            </div>
          </Link>
          {/* Main Image - Full Width, No Padding */}
          <div className="relative w-full h-full flex items-center justify-center">
            {imageUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={activeImage?.alt || post.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            
            {/* Drop Badge */}
            {isLimited && (
              <div className="absolute top-6 left-6 bg-red text-white px-6 py-3 border-2 border-white font-heading font-bold uppercase text-sm rotate-[-4deg] shadow-xl z-10">
                Limited
              </div>
            )}
            
            {/* Pagination Dots */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
                {galleryImages.map((_img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`transition-all ${
                      index === activeImageIndex
                        ? 'w-8 h-2 bg-goldenrod'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center p-8 lg:p-16 bg-black">
          <div className="max-w-xl mx-auto w-full">
            {/* Product Type Badge */}
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-goldenrod" />
              <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-goldenrod">
                {post.productType || 'Merch Drop'}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase mb-8 leading-[0.9] text-white">
              {post.title}
            </h1>

            {/* Countdown or Stock Warning */}
            {isUpcoming && timeUntilDrop && (
              <div className="bg-goldenrod text-black p-6 mb-8 border-2 border-goldenrod">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6" />
                  <span className="font-heading text-xs font-bold uppercase tracking-wider">Drops In:</span>
                </div>
                <p className="font-heading text-3xl font-bold tabular-nums">
                  {timeUntilDrop}
                </p>
              </div>
            )}

            {stockLow && !soldOut && (
              <div className="bg-red/20 border-2 border-red text-red p-4 mb-8 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-heading text-sm font-bold uppercase">
                  Only {post.stock} Left in Stock!
                </p>
              </div>
            )}

            {/* Price */}
            {post.price && (
              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl font-heading font-bold text-white">
                    ${post.price}
                  </span>
                  {post.originalPrice && (
                    <span className="text-2xl font-heading text-white/40 line-through">
                      ${post.originalPrice}
                    </span>
                  )}
                </div>
                {post.originalPrice && (
                  <p className="text-sm font-heading text-goldenrod font-bold uppercase">
                    Save ${(post.originalPrice - post.price).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            <div className="h-px bg-white/20 w-full mb-8" />

            {/* Size Selector */}
            {post.sizes && post.sizes.length > 0 && (
              <div className="mb-8">
                <p className="font-heading text-xs uppercase tracking-widest text-white/60 mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {post.sizes.map((size: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 border-2 transition-colors font-heading font-bold uppercase text-sm ${
                        selectedSize === size
                          ? 'border-goldenrod bg-goldenrod text-black'
                          : 'border-white/30 text-white hover:border-goldenrod hover:bg-goldenrod hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {post.description && (
              <p className="text-xl text-white/80 leading-relaxed mb-8 font-body">
                {post.description}
              </p>
            )}

            {/* Details */}
            {post.body && (
              <div className="prose prose-invert prose-lg max-w-none font-body mb-12
                prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-teal prose-a:font-bold hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-ul:text-white/70">
                <PortableText content={post.body} />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-4">
              {soldOut ? (
                <button disabled className="w-full py-5 bg-white/10 text-white/40 font-heading font-bold uppercase cursor-not-allowed border-2 border-white/20">
                  Sold Out
                </button>
              ) : isUpcoming ? (
                <button className="w-full py-5 bg-goldenrod text-black hover:bg-white hover:text-black transition-colors border-2 border-goldenrod font-heading font-bold uppercase text-lg shadow-[4px_4px_0px_0px_rgba(218,165,32,0.3)]">
                  Notify Me When Available
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-5 bg-white text-black hover:bg-goldenrod hover:text-black transition-colors border-2 border-white font-heading font-bold uppercase text-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(218,165,32,0.3)] hover:-translate-y-0.5 transition-all"
                  >
                    Add to Cart — ${post.price}
                  </button>
                  {post.ctaLink && (
                    <a
                      href={post.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-4 text-center border-2 border-white/30 text-white hover:border-goldenrod hover:bg-goldenrod/10 transition-colors font-heading font-bold uppercase"
                    >
                      Learn More
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


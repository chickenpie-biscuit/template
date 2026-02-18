'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Clock, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  // Handle both product and feedPost image structures
  const imageSource = product.images?.[0] || (product as any).featuredImage;
  const imageUrl = imageSource
    ? urlFor(imageSource as any).width(600).height(600).url()
    : '/images/placeholder.jpg';

  // Determine product status
  const isLimited = (product as any).limitedQuantity;
  const stockLow = product.stock !== undefined && product.stock > 0 && product.stock <= 10;
  const soldOut = product.stock !== undefined && product.stock <= 0;
  const hasDiscount = (product as any).originalPrice && (product as any).originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / (product as any).originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) return;
    
    addItem({
      id: product.slug,
      name: product.title,
      price: product.price,
      image: imageUrl,
    });
  };

  return (
    <motion.div
      className="group relative bg-cream border-2 border-black overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden bg-cream">
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.title}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              soldOut ? 'grayscale opacity-60' : ''
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />

          {/* Badges - Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isLimited && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red text-cream font-heading font-bold uppercase text-[10px] tracking-wider border border-cream/20">
                <Zap className="w-3 h-3" />
                Limited
              </span>
            )}
            {hasDiscount && (
              <span className="px-3 py-1.5 bg-goldenrod text-black font-heading font-bold uppercase text-[10px] tracking-wider">
                -{discountPercent}%
              </span>
            )}
            {product.featured && !isLimited && (
              <span className="px-3 py-1.5 bg-teal text-black font-heading font-bold uppercase text-[10px] tracking-wider">
                New
              </span>
            )}
          </div>

          {/* Stock Warning - Top Right */}
          {stockLow && !soldOut && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/80 text-cream font-heading font-bold uppercase text-[10px] backdrop-blur-sm">
                <Clock className="w-3 h-3 text-red" />
                {product.stock} left
              </span>
            </div>
          )}

          {/* Sold Out Overlay */}
          {soldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="px-6 py-3 bg-black text-cream font-heading font-bold uppercase text-sm border-2 border-cream">
                Sold Out
              </span>
            </div>
          )}

          {/* Hover Actions */}
          {!soldOut && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 z-10">
              <button
                onClick={handleAddToCart}
                className="px-5 py-3 bg-cream text-black border-2 border-black font-heading font-bold uppercase text-xs hover:bg-goldenrod transition-colors flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                aria-label={`Add ${product.title} to cart`}
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
              <Link
                href={`/shop/${product.slug}`}
                className="w-12 h-12 bg-black text-cream border-2 border-black flex items-center justify-center hover:bg-teal hover:text-black transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]"
                aria-label={`View ${product.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={18} />
              </Link>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 border-t-2 border-black">
          {/* Category/Type */}
          {((product as any).productType || product.category?.title) && (
            <span className="block font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-2">
              {(product as any).productType || product.category?.title}
            </span>
          )}

          {/* Title */}
          <h3 className="font-heading font-bold text-base uppercase mb-3 text-black leading-tight group-hover:text-teal-300 transition-colors line-clamp-2">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-heading font-bold text-black">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm font-heading text-black/40 line-through">
                {formatPrice((product as any).originalPrice)}
              </span>
            )}
          </div>

          {/* Sizes Preview */}
          {(product as any).sizes && (product as any).sizes.length > 0 && (
            <div className="mt-3 flex gap-1">
              {(product as any).sizes.slice(0, 5).map((size: string, i: number) => (
                <span
                  key={i}
                  className="w-7 h-7 flex items-center justify-center text-[10px] font-heading font-bold border border-black/20 text-black/60"
                >
                  {size}
                </span>
              ))}
              {(product as any).sizes.length > 5 && (
                <span className="w-7 h-7 flex items-center justify-center text-[10px] font-heading font-bold text-black/40">
                  +{(product as any).sizes.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { Product } from '@/types/sanity';
import { formatPrice } from '@/lib/utils';
import PortableText from '@/components/sanity/PortableText';
import AddToCartButton from './AddToCartButton';
import { Package, Truck, Shield, RotateCcw, Clock } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  isLimited: boolean;
  stockLow: boolean;
  soldOut: boolean;
  hasDiscount: boolean;
  discountPercent: number;
}

export default function ProductDetails({
  product,
  isLimited,
  stockLow,
  soldOut,
  hasDiscount,
  discountPercent,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      {/* Category */}
      {((product as any).productType || product.category?.title) && (
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-black/40" />
          <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-black/40">
            {(product as any).productType || product.category?.title}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl lg:text-5xl font-heading font-bold uppercase leading-tight text-black mb-6">
        {product.title}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-4xl font-heading font-bold text-black">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl font-heading text-black/40 line-through">
              {formatPrice((product as any).originalPrice)}
            </span>
            <span className="px-3 py-1 bg-goldenrod text-black font-heading font-bold uppercase text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Save {formatPrice((product as any).originalPrice - product.price)}
            </span>
          </>
        )}
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <p className="text-lg font-body text-black/70 leading-relaxed mb-8">
          {product.shortDescription}
        </p>
      )}

      {/* Size Selector */}
      {(product as any).sizes && (product as any).sizes.length > 0 && (
        <div className="mb-8">
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-black/60 mb-3">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2">
            {(product as any).sizes.map((size: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-3 border-2 transition-colors font-heading font-bold uppercase text-sm ${
                  selectedSize === size
                    ? 'border-black bg-black text-cream'
                    : 'border-black text-black hover:bg-black hover:text-cream'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock Info */}
      {product.stock !== undefined && product.stock > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${stockLow ? 'bg-red animate-pulse' : 'bg-teal'}`} />
            <span className="font-body text-sm text-black/60">
              {stockLow ? `Only ${product.stock} left!` : `${product.stock} in stock`}
            </span>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <div className="mb-8">
        <AddToCartButton product={product} selectedSize={selectedSize || undefined} />
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-black/10">
        <div className="text-center">
          <Truck className="w-5 h-5 mx-auto mb-2 text-black/60" />
          <p className="font-heading text-[10px] uppercase tracking-wider text-black/60">Free Ship $50+</p>
        </div>
        <div className="text-center">
          <Shield className="w-5 h-5 mx-auto mb-2 text-black/60" />
          <p className="font-heading text-[10px] uppercase tracking-wider text-black/60">Secure Pay</p>
        </div>
        <div className="text-center">
          <RotateCcw className="w-5 h-5 mx-auto mb-2 text-black/60" />
          <p className="font-heading text-[10px] uppercase tracking-wider text-black/60">30 Day Returns</p>
        </div>
      </div>

      {/* Product Details */}
      {product.description && (
        <div className="mt-8">
          <h2 className="font-heading font-bold uppercase text-lg mb-4 text-black">
            Product Details
          </h2>
          <div className="font-body text-black/70 leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-2">
            <PortableText content={product.description} />
          </div>
        </div>
      )}

      {/* SKU */}
      {product.sku && (
        <p className="mt-6 font-body text-xs text-black/40">
          SKU: {product.sku}
        </p>
      )}
    </div>
  );
}

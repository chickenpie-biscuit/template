'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : '/images/placeholder.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: imageUrl,
    });
  };

  return (
    <motion.div
      className="group relative bg-cream border-2 border-black overflow-hidden hover:shadow-lg transition-all"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-black">
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Quick Add Button on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-red-200 text-black border-2 border-black font-heading font-bold uppercase text-xs hover:bg-red-300 transition-colors flex items-center gap-2"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-heading font-bold text-lg uppercase mb-2 text-black hover:text-red-200 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-heading font-bold text-black">
            {formatPrice(product.price)}
          </span>
          {product.featured && (
            <span className="px-2 py-1 text-xs font-heading font-bold uppercase bg-goldenrod-200 text-goldenrod-300 border border-black">
              New
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}


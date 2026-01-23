'use client';

import { useState } from 'react';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: string;
}

export default function AddToCartButton({ product, selectedSize }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  
  const mainImage = product.images?.[0] || product.featuredImage;
  const imageUrl = mainImage
    ? urlFor(mainImage as any).width(400).height(400).url()
    : '/images/placeholder.jpg';

  const handleAddToCart = () => {
    // Check if product has sizes and no size is selected
    const hasSizes = (product as any).sizes && (product as any).sizes.length > 0;
    if (hasSizes && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: imageUrl,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <Button
      size="lg"
      className="w-full bg-goldenrod text-black hover:bg-black hover:text-goldenrod border-2 border-black font-heading font-bold uppercase transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
      onClick={handleAddToCart}
      disabled={isOutOfStock || added}
      aria-label={`Add ${product.title} to cart`}
    >
      {added ? (
        <>
          <Check className="mr-2" size={20} />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2" size={20} />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </>
      )}
    </Button>
  );
}


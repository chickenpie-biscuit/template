'use client';

import { useState } from 'react';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  
  const mainImage = product.images?.[0] || product.featuredImage;
  const imageUrl = mainImage
    ? urlFor(mainImage as any).width(400).height(400).url()
    : '/images/placeholder.jpg';

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <Button
      size="lg"
      className="w-full"
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


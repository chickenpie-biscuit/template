'use client';

import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0] as any).width(400).height(400).url()
    : '/images/placeholder.jpg';

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: imageUrl,
    });
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      aria-label={`Add ${product.title} to cart`}
    >
      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  );
}


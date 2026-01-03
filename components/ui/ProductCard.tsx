import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatPrice } from '@/lib/utils';
import Button from './Button';
import { useCartStore } from '@/lib/store';

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
    addItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: imageUrl,
    });
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/shop/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {product.shortDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}


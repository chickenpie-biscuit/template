import { client } from '@/sanity/lib/client';
import { getProductBySlug, getFeaturedProducts } from '@/sanity/lib/queries';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import PortableText from '@/components/sanity/PortableText';
import { useCartStore } from '@/lib/store';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await (client
    ?.fetch<Product | null>(getProductBySlug, { slug })
    .catch(() => null) ?? Promise.resolve(null));

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | Site Template`,
    description: product.shortDescription || product.title,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await (client
    ?.fetch<Product | null>(getProductBySlug, { slug })
    .catch(() => null) ?? Promise.resolve(null));

  if (!product) {
    notFound();
  }

  const relatedProducts = await (client
    ?.fetch<Product[]>(getFeaturedProducts)
    .catch(() => []) ?? Promise.resolve([]));

  // Handle both product and feedPost image structures
  const mainImage = product.images?.[0] || product.featuredImage;
  const mainImageUrl = mainImage
    ? urlFor(mainImage as any).width(800).height(800).url()
    : '/images/placeholder.jpg';

  return (
    <div className="py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={mainImageUrl}
                alt={product.images?.[0]?.alt || product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => {
                  const imageUrl = urlFor(image as any).width(200).height(200).url();
                  return (
                    <div
                      key={index}
                      className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={imageUrl}
                        alt={image.alt || `${product.title} ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Show original price if available (for feedPost merch-drops) */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="mt-4">
                <span className="text-lg text-gray-400 line-through mr-2">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-bold text-red-600">
                  Save {formatPrice(product.originalPrice - product.price)}!
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <div className="text-3xl font-bold text-primary-600 mb-6">
              {formatPrice(product.price)}
            </div>

            {product.shortDescription && (
              <p className="text-lg text-gray-600 mb-6">
                {product.shortDescription}
              </p>
            )}

            <div className="mb-6 space-y-2">
              {product.sku && (
                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              )}
              {product.stock !== undefined && (
                <p className="text-sm text-gray-500">
                  Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </p>
              )}
              {product.productType && (
                <p className="text-sm text-gray-500">
                  Type: {product.productType === 'digital' ? 'Digital' : 'Physical'}
                </p>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Available Sizes:</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border-2 border-black bg-cream text-black font-heading font-bold uppercase text-xs hover:bg-black hover:text-cream transition-colors cursor-pointer"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.limitedQuantity && (
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 border-2 border-red-800 font-heading font-bold uppercase text-xs">
                    Limited Edition
                  </span>
                </div>
              )}
            </div>

            <AddToCartButton product={product} />

            {product.description && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <PortableText content={product.description} />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts
                .filter((p) => p._id !== product._id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <ProductCard key={relatedProduct._id} product={relatedProduct} />
                ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}


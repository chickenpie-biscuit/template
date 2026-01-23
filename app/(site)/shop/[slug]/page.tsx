import { client } from '@/sanity/lib/client';
import { getProductBySlug, getAllProducts } from '@/sanity/lib/queries';
import { Product } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import ProductCard from '@/components/ui/ProductCard';
import ProductGallery from '@/components/shop/ProductGallery';
import PortableText from '@/components/sanity/PortableText';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import { 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw, 
  Zap, 
  Clock, 
  Package,
  ChevronRight,
  Star
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await client
    ?.fetch<Product | null>(getProductBySlug, { slug })
    .catch(() => null);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0] as any).width(1200).height(630).url()
    : null;

  return {
    title: `${product.title} | Chickenpie Shop`,
    description: product.shortDescription || `Shop ${product.title} at Chickenpie`,
    openGraph: {
      title: product.title,
      description: product.shortDescription || `Shop ${product.title}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await client
    ?.fetch<Product | null>(getProductBySlug, { slug })
    .catch(() => null);

  if (!product) {
    notFound();
  }

  // Get related products (same type or featured)
  const allProducts = await client
    ?.fetch<Product[]>(getAllProducts)
    .catch(() => []) ?? [];
  
  const relatedProducts = allProducts
    .filter(p => p._id !== product._id)
    .filter(p => (p as any).productType === (product as any).productType || p.featured)
    .slice(0, 4);

  // Product status
  const isLimited = (product as any).limitedQuantity;
  const stockLow = product.stock !== undefined && product.stock > 0 && product.stock <= 10;
  const soldOut = product.stock !== undefined && product.stock <= 0;
  const hasDiscount = (product as any).originalPrice && (product as any).originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / (product as any).originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb Navigation */}
      <div className="bg-cream border-b border-black/10">
        <Container>
          <div className="py-4 flex items-center gap-2 text-sm">
            <Link href="/shop" className="font-body text-black/60 hover:text-black transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-black/30" />
            {(product as any).productType && (
              <>
                <Link 
                  href={`/shop?category=${(product as any).productType}`} 
                  className="font-body text-black/60 hover:text-black transition-colors capitalize"
                >
                  {(product as any).productType.replace(/-/g, ' ')}
                </Link>
                <ChevronRight className="w-4 h-4 text-black/30" />
              </>
            )}
            <span className="font-body text-black truncate">{product.title}</span>
          </div>
        </Container>
      </div>

      {/* Alert Banner for Limited/Low Stock */}
      {(isLimited || stockLow) && !soldOut && (
        <div className={`py-3 text-center ${isLimited ? 'bg-red text-cream' : 'bg-goldenrod text-black'}`}>
          <div className="flex items-center justify-center gap-2">
            {isLimited ? <Zap className="w-4 h-4 animate-pulse" /> : <Clock className="w-4 h-4" />}
            <span className="font-heading font-bold uppercase text-sm tracking-wider">
              {isLimited ? 'Limited Edition' : `Only ${product.stock} left in stock!`}
            </span>
            {isLimited && <Zap className="w-4 h-4 animate-pulse" />}
          </div>
        </div>
      )}

      {/* Main Product Section */}
      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Images (Client Component) */}
            <ProductGallery product={product} />

            {/* Product Info */}
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
                        className="px-5 py-3 border-2 border-black text-black hover:bg-black hover:text-cream transition-colors font-heading font-bold uppercase text-sm"
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
                <AddToCartButton product={product} />
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
          </div>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-black">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-heading font-bold uppercase text-2xl lg:text-3xl text-cream">
                You May Also Like
              </h2>
              <Link 
                href="/shop" 
                className="font-heading font-bold uppercase text-sm text-cream/60 hover:text-cream transition-colors flex items-center gap-2"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Back to Shop */}
      <section className="py-12 bg-cream border-t-2 border-black">
        <Container>
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 font-heading font-bold uppercase text-black hover:text-teal-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

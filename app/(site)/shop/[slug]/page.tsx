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
import ProductDetails from './ProductDetails';
import { 
  ArrowLeft, 
  Zap, 
  Clock, 
  ChevronRight,
} from 'lucide-react';
import ProductSchema from '@/components/seo/ProductSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductReviews from '@/components/shop/ProductReviews';

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

  const ogImageUrl = product.seo?.ogImage
    ? urlFor(product.seo.ogImage as any).width(1200).height(630).url()
    : product.images?.[0]
    ? urlFor(product.images[0] as any).width(1200).height(630).url()
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';
  const productUrl = `${siteUrl}/shop/${slug}`;

  return {
    title: product.seo?.metaTitle || `${product.title} | Chickenpie Shop`,
    description: product.seo?.metaDescription || product.shortDescription || `Shop ${product.title} at Chickenpie`,
    keywords: product.seo?.keywords || [],
    alternates: {
      canonical: product.seo?.canonicalUrl || productUrl,
    },
    openGraph: {
      type: 'website',
      title: product.seo?.metaTitle || product.title,
      description: product.seo?.metaDescription || product.shortDescription || `Shop ${product.title}`,
      url: productUrl,
      siteName: 'Chickenpie',
      images: ogImageUrl ? [{ 
        url: ogImageUrl, 
        width: 1200, 
        height: 630,
        alt: product.seo?.ogImage?.alt || product.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo?.metaTitle || product.title,
      description: product.seo?.metaDescription || product.shortDescription || `Shop ${product.title}`,
      images: ogImageUrl ? [ogImageUrl] : [],
      creator: '@chickenpie',
    },
    robots: {
      index: !product.seo?.noIndex,
      follow: !product.seo?.noFollow,
      googleBot: {
        index: !product.seo?.noIndex,
        follow: !product.seo?.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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

  // SEO data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';
  const productUrl = `${siteUrl}/shop/${slug}`;
  const mainImage = product.images?.[0];
  const imageUrl = mainImage
    ? urlFor(mainImage as any).width(1200).height(1200).url()
    : null;
  
  // Determine availability status
  let availability: 'InStock' | 'OutOfStock' | 'PreOrder' | 'LimitedAvailability' = 'InStock';
  if (soldOut) {
    availability = 'OutOfStock';
  } else if (isLimited || stockLow) {
    availability = 'LimitedAvailability';
  }

  // Calculate aggregate rating from reviews
  const reviews = (product as any).reviews || [];
  const aggregateRating = reviews.length > 0 ? {
    value: reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length,
    count: reviews.length,
    bestRating: 5,
    worstRating: 1,
  } : undefined;

  // Format reviews for schema
  const schemaReviews = reviews.slice(0, 5).map((review: any) => ({
    author: review.author || 'Anonymous',
    rating: review.rating || 0,
    reviewBody: review.comment || '',
    datePublished: review.date || new Date().toISOString(),
  }));

  return (
    <>
      {/* Structured Data - Product Schema */}
      <ProductSchema
        name={product.title}
        description={product.shortDescription || product.title}
        imageUrl={imageUrl || undefined}
        price={product.price}
        availability={availability}
        url={productUrl}
        sku={product.sku}
        category={(product as any).productType}
        rating={aggregateRating}
        reviews={schemaReviews}
      />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Shop', url: `${siteUrl}/shop` },
          ...((product as any).productType ? [{ name: (product as any).productType.replace(/-/g, ' '), url: `${siteUrl}/shop?category=${(product as any).productType}` }] : []),
          { name: product.title, url: productUrl },
        ]}
      />
      
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

            {/* Product Info (Client Component) */}
            <ProductDetails
              product={product}
              isLimited={isLimited}
              stockLow={stockLow}
              soldOut={soldOut}
              hasDiscount={hasDiscount}
              discountPercent={discountPercent}
            />
          </div>
        </Container>
      </section>

      {/* Customer Reviews */}
      <ProductReviews 
        reviews={reviews}
        averageRating={aggregateRating?.value}
      />

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
    </>
  );
}

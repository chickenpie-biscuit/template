import { client } from '@/sanity/lib/client';
import { getAllProducts, getAllCategories, getActiveBanners } from '@/sanity/lib/queries';
import { Product, Category, AdBanner } from '@/types/sanity';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/ui/Container';
import ShopHero from '@/components/ui/ShopHero';
import ShopFilterBar from '@/components/ui/ShopFilterBar';
import AdBannerComponent from '@/components/ui/AdBanner';
import Link from 'next/link';
import { Metadata } from 'next';
import { Flame, Gift, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop | Chickenpie',
  description: 'Browse our collection of limited edition merchandise, art prints, and exclusive drops. When they\'re gone, they\'re gone.',
  openGraph: {
    title: 'Shop | Chickenpie',
    description: 'Limited edition merchandise and exclusive drops.',
  },
};

export const revalidate = 60;

interface ShopPageProps {
  searchParams: { category?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const selectedCategory = searchParams?.category || 'all';
  
  let allProducts: Product[] = [];
  let categories: Category[] = [];
  let banners: AdBanner[] = [];

  try {
    const [productsData, categoriesData, bannersData] = await Promise.all([
      client?.fetch<Product[]>(getAllProducts).catch(() => []),
      client?.fetch<Category[]>(getAllCategories).catch(() => []),
      client?.fetch<AdBanner[]>(getActiveBanners).catch(() => []),
    ]);
    allProducts = productsData || [];
    categories = categoriesData || [];
    banners = bannersData || [];
  } catch (error) {
    console.error('Shop page data fetch error:', error);
  }

  // Separate products by type
  const featuredProducts = allProducts.filter(p => p.featured);
  const limitedProducts = allProducts.filter(p => (p as any).limitedQuantity);
  const lowStockProducts = allProducts.filter(p => p.stock !== undefined && p.stock > 0 && p.stock <= 10);
  
  // Filter products by category
  const products = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => {
        if (p.category?.slug === selectedCategory) return true;
        if ((p as any).productType === selectedCategory) return true;
        return false;
      });

  // Get unique product types for filtering
  const productTypes = [...new Set(allProducts.map(p => (p as any).productType).filter(Boolean))];

  return (
    <div className="min-h-screen bg-cream">
      <ShopHero />
      
      {/* Featured/Limited Section - Only show if we have featured or limited items */}
      {(featuredProducts.length > 0 || limitedProducts.length > 0) && selectedCategory === 'all' && (
        <section className="bg-black py-16 lg:py-20 border-b-2 border-cream/20">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red flex items-center justify-center">
                  <Flame className="w-6 h-6 text-cream" />
                </div>
                <div>
                  <h2 className="font-heading font-bold uppercase text-2xl lg:text-3xl text-cream">
                    Hot Right Now
                  </h2>
                  <p className="font-body text-sm text-cream/60">
                    Limited drops & new arrivals
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...limitedProducts, ...featuredProducts]
                .filter((p, i, arr) => arr.findIndex(x => x._id === p._id) === i)
                .slice(0, 4)
                .map((product, index) => (
                  <ProductCard key={product._id} product={product} priority={index < 2} />
                ))}
            </div>
          </Container>
        </section>
      )}

      {/* Urgency Banner */}
      {lowStockProducts.length > 0 && selectedCategory === 'all' && (
        <div className="bg-red text-cream py-3 border-b-2 border-cream/20">
          <Container>
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <p className="font-heading font-bold uppercase text-sm tracking-wider text-center">
                {lowStockProducts.length} {lowStockProducts.length === 1 ? 'item is' : 'items are'} almost sold out!
              </p>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          </Container>
        </div>
      )}

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-black py-4">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="font-heading font-bold uppercase text-sm tracking-widest text-black">
                {products.length} {products.length === 1 ? 'Item' : 'Items'}
              </span>
              {selectedCategory !== 'all' && (
                <Link 
                  href="/shop" 
                  className="font-heading text-sm uppercase text-black/60 hover:text-black transition-colors underline underline-offset-4"
                >
                  Clear Filter
                </Link>
              )}
            </div>
            <ShopFilterBar categories={categories} activeFilter={selectedCategory} />
          </div>
        </Container>
      </div>

      {/* Quick Category Pills */}
      {productTypes.length > 0 && (
        <div className="bg-cream border-b border-black/10 py-4">
          <Container>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <Link
                href="/shop"
                className={`px-5 py-2 font-heading font-bold uppercase text-xs tracking-wider whitespace-nowrap transition-all border-2 ${
                  selectedCategory === 'all'
                    ? 'bg-black text-cream border-black'
                    : 'bg-transparent text-black border-black/20 hover:border-black'
                }`}
              >
                All
              </Link>
              {productTypes.map((type) => (
                <Link
                  key={type}
                  href={`/shop?category=${type}`}
                  className={`px-5 py-2 font-heading font-bold uppercase text-xs tracking-wider whitespace-nowrap transition-all border-2 ${
                    selectedCategory === type
                      ? 'bg-black text-cream border-black'
                      : 'bg-transparent text-black border-black/20 hover:border-black'
                  }`}
                >
                  {type.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Inline Banner - Shop Promotion */}
      {banners.filter(b => b.placement === 'inline').length > 0 && selectedCategory === 'all' && (
        <div className="bg-cream py-4">
          <Container>
            <AdBannerComponent
              banners={banners}
              placement="inline"
              variant="inline"
            />
          </Container>
        </div>
      )}

      {/* Main Products Grid */}
      <section className="bg-cream py-12 lg:py-16">
        <Container>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product._id} product={product} priority={index < 4} />
                ))}
              </div>

              {/* Bottom CTA */}
              {products.length >= 8 && (
                <div className="mt-16 text-center">
                  <p className="font-body text-lg text-black/60 mb-4">
                    Can&apos;t find what you&apos;re looking for?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-heading font-bold uppercase text-sm text-black hover:text-teal-300 transition-colors underline underline-offset-4"
                  >
                    Request a custom order
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="inline-block border-4 border-black bg-cream p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Gift className="w-16 h-16 mx-auto mb-6 text-black/20" />
                <p className="font-heading text-3xl font-bold uppercase text-black mb-4">
                  No products found
                </p>
                <p className="font-body text-black/60 mb-8 max-w-md">
                  We&apos;re always adding new items to our collection. Check back soon or browse all products.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-4 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:bg-teal hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                >
                  View All Products
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter/Updates Section */}
      <section className="bg-black py-16 lg:py-20 border-t-2 border-cream/20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-6 text-goldenrod" />
            <h2 className="font-heading font-bold uppercase text-3xl lg:text-4xl text-cream mb-4">
              Don&apos;t Miss a Drop
            </h2>
            <p className="font-body text-lg text-cream/70 mb-8">
              Be the first to know about new releases, exclusive drops, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-cream/10 border-2 border-cream/30 text-cream placeholder:text-cream/40 font-body focus:outline-none focus:border-goldenrod transition-colors"
              />
              <button className="px-8 py-4 bg-goldenrod text-black border-2 border-goldenrod font-heading font-bold uppercase hover:bg-cream transition-colors">
                Subscribe
              </button>
            </div>
            <p className="font-body text-xs text-cream/40 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

import { client } from '@/sanity/lib/client';
import { getAllProducts, getAllCategories } from '@/sanity/lib/queries';
import { Product, Category } from '@/types/sanity';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/ui/Container';
import ShopHero from '@/components/ui/ShopHero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Chickenpie',
  description: 'Browse our collection of Chickenpie merchandise',
};

export const revalidate = 60;

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    client?.fetch<Product[]>(getAllProducts).catch(() => []) ?? [],
    client?.fetch<Category[]>(getAllCategories).catch(() => []) ?? [],
  ]);

  return (
    <div className="min-h-screen bg-cream">
      <ShopHero />
      
      <section className="py-12 border-b-2 border-black">
        <Container>
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href="/shop"
                className="px-4 py-2 font-heading font-bold uppercase text-sm border-2 border-black bg-red-200 text-red-300 hover:bg-red-300 transition-colors"
              >
                All Products
              </a>
              <a
                href="/shop?category=t-shirts"
                className="px-4 py-2 font-heading font-bold uppercase text-sm border-2 border-black bg-cream text-black hover:bg-cream-200 transition-colors"
              >
                T-Shirts
              </a>
              <a
                href="/shop?category=prints"
                className="px-4 py-2 font-heading font-bold uppercase text-sm border-2 border-black bg-cream text-black hover:bg-cream-200 transition-colors"
              >
                Prints
              </a>
              <a
                href="/shop?category=accessories"
                className="px-4 py-2 font-heading font-bold uppercase text-sm border-2 border-black bg-cream text-black hover:bg-cream-200 transition-colors"
              >
                Accessories
              </a>
              <a
                href="/shop?category=new-arrivals"
                className="px-4 py-2 font-heading font-bold uppercase text-sm border-2 border-black bg-cream text-black hover:bg-cream-200 transition-colors"
              >
                New Arrivals
              </a>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-body text-black/60 text-lg">
                No products available yet. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}


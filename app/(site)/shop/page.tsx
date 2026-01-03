import { client } from '@/sanity/lib/client';
import { getAllProducts, getAllCategories } from '@/sanity/lib/queries';
import { Product, Category } from '@/types/sanity';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/ui/Container';
import ShopHero from '@/components/ui/ShopHero';
import ShopFilterBar from '@/components/ui/ShopFilterBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Chickenpie',
  description: 'Browse our collection of Chickenpie merchandise',
};

export const revalidate = 60;

interface ShopPageProps {
  searchParams: { category?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const selectedCategory = searchParams?.category || 'all';
  
  const [allProducts, categories] = await Promise.all([
    client?.fetch<Product[]>(getAllProducts).catch(() => []) ?? [],
    client?.fetch<Category[]>(getAllCategories).catch(() => []) ?? [],
  ]);

  // Filter products by category if selected
  const products = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category?.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-cream">
      <ShopHero />
      
      <section className="py-12 border-b-2 border-black">
        <Container>
          {/* Category Filter */}
          <ShopFilterBar categories={categories} activeFilter={selectedCategory} />

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block border-2 border-black bg-cream p-8">
                <p className="font-heading text-2xl font-bold uppercase text-black mb-2">
                  No products found
                </p>
                <p className="font-body text-sm text-black/60">
                  Check back soon for new merchandise!
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

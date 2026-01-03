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
  
  // Safe data fetching with error handling
  let allProducts: Product[] = [];
  let categories: Category[] = [];

  try {
    const [productsData, categoriesData] = await Promise.all([
      client?.fetch<Product[]>(getAllProducts).catch((err) => {
        console.error('Error fetching products:', err);
        return [];
      }),
      client?.fetch<Category[]>(getAllCategories).catch((err) => {
        console.error('Error fetching categories:', err);
        return [];
      }),
    ]);
    allProducts = productsData || [];
    categories = categoriesData || [];
  } catch (error) {
    console.error('Shop page data fetch error:', error);
  }

  // Filter products by category if selected
  const products = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => {
        // Check category slug match (for Product type)
        if (p.category?.slug === selectedCategory) return true;
        // Check productType match (for feedPost merch-drops)
        if (p.productType === selectedCategory) return true;
        return false;
      });

  return (
    <div className="min-h-screen bg-cream">
      <ShopHero />
      
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-black py-4 transition-all duration-300">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-heading font-bold uppercase text-sm tracking-widest text-black/60">
              {products.length} {products.length === 1 ? 'Item' : 'Items'}
            </span>
            <ShopFilterBar categories={categories} activeFilter={selectedCategory} />
          </div>
        </Container>
      </div>

      <section className="bg-cream min-h-[50vh]">
        {/* Products Grid - Full Width like Feed */}
        <div className="w-full px-4 md:px-6 lg:px-8 py-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="inline-block border-2 border-black bg-cream p-12">
                <p className="font-heading text-3xl font-bold uppercase text-black mb-4">
                  No products found
                </p>
                <p className="font-body text-black/60 mb-6">
                  Try a different category or check back soon!
                </p>
                <a
                  href="/shop"
                  className="inline-block px-6 py-3 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  View All Products
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { client } from '@/sanity/lib/client';
import { getAllProducts, getAllCategories } from '@/sanity/lib/queries';
import { Product, Category } from '@/types/sanity';
import ProductCard from '@/components/ui/ProductCard';
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

  // Filter products by category or productType if selected
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
      {/* Header with Filters */}
      <div className="sticky top-0 z-40 bg-cream border-b-2 border-black py-6 backdrop-blur-sm bg-cream/95">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Shop Header */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold uppercase text-black">
                Chickenpie Shop
              </h1>
              <p className="font-body text-sm text-black/60 mt-1">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {/* Filter Buttons */}
            <ShopFilterBar categories={categories} activeFilter={selectedCategory} />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="px-6 py-3 bg-black text-cream border-2 border-black font-heading font-bold uppercase hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  View All Products
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

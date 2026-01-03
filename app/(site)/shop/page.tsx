import { client } from '@/sanity/lib/client';
import { getAllProducts, getAllCategories } from '@/sanity/lib/queries';
import { Product, Category } from '@/types/sanity';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Site Template',
  description: 'Browse our collection of products',
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    client?.fetch<Product[]>(getAllProducts).catch(() => []) ?? [],
    client?.fetch<Category[]>(getAllCategories).catch(() => []) ?? [],
  ]);

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shop</h1>
          <p className="text-gray-600">Browse our collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    All Products
                  </a>
                </li>
                {categories.map((category) => (
                  <li key={category._id}>
                    <a
                      href={`/shop?category=${category.slug}`}
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products available yet</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}


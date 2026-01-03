import { client } from '@/sanity/lib/client';
import { getFeaturedProducts, getFeaturedPosts } from '@/sanity/lib/queries';
import { Product, Post } from '@/types/sanity';
import ProductCard from '@/components/ui/ProductCard';
import BlogCard from '@/components/ui/BlogCard';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default async function HomePage() {
  const [products, posts] = await Promise.all([
    client?.fetch<Product[]>(getFeaturedProducts).catch(() => []) ?? [],
    client?.fetch<Post[]>(getFeaturedPosts).catch(() => []) ?? [],
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Site Template
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              A modern Next.js and Sanity CMS template for building amazing
              websites
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/shop">
                <Button variant="secondary" size="lg">Shop Now</Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Check out our most popular items</p>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No featured products yet</p>
          )}
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button>View All Products</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600">Stay updated with our latest news</p>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No blog posts yet</p>
          )}
          <div className="text-center mt-8">
            <Link href="/blog">
              <Button>View All Posts</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-8">
              Explore our products and discover amazing content
            </p>
            <Link href="/shop">
              <Button variant="secondary" size="lg">Start Shopping</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}


import { client } from '@/sanity/lib/client';
import { getAllPosts, getAllCategories } from '@/sanity/lib/queries';
import { Post, Category } from '@/types/sanity';
import BlogCard from '@/components/ui/BlogCard';
import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Site Template',
  description: 'Read our latest blog posts',
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    client?.fetch<Post[]>(getAllPosts).catch(() => []) ?? [],
    client?.fetch<Category[]>(getAllCategories).catch(() => []) ?? [],
  ]);

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600">Latest news and updates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/blog"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    All Posts
                  </a>
                </li>
                {categories.map((category) => (
                  <li key={category._id}>
                    <a
                      href={`/blog?category=${category.slug}`}
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Posts Grid */}
          <div className="lg:col-span-3">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No blog posts yet</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}


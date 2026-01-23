import { client } from '@/sanity/lib/client';
import { getPostBySlug, getFeaturedPosts, getActiveBanners } from '@/sanity/lib/queries';
import { Post, AdBanner } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/ui/BlogCard';
import PortableText from '@/components/sanity/PortableText';
import AdBannerComponent from '@/components/ui/AdBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await (client
    ?.fetch<Post | null>(getPostBySlug, { slug })
    .catch(() => null) ?? Promise.resolve(null));

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Site Template`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Fetch post, related posts, and banners in parallel
  const [post, relatedPosts, banners] = await Promise.all([
    client?.fetch<Post | null>(getPostBySlug, { slug }).catch(() => null) ?? Promise.resolve(null),
    client?.fetch<Post[]>(getFeaturedPosts).catch(() => []) ?? Promise.resolve([]),
    client?.fetch<AdBanner[]>(getActiveBanners).catch(() => []) ?? Promise.resolve([]),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage as any).width(1200).height(600).url()
    : '/images/placeholder.jpg';

  // Get sidebar banners
  const sidebarBanners = banners?.filter(b => b.placement === 'sidebar' && b.active) || [];
  const inlineBanners = banners?.filter(b => b.placement === 'inline' && b.active) || [];

  return (
    <div className="py-12">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              {post.author && <span>By {post.author}</span>}
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </div>
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-6">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 italic">{post.excerpt}</p>
          )}

          {/* Content */}
          {post.body && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText content={post.body} />
            </div>
          )}

          {/* Inline Banner - After Content */}
          {inlineBanners.length > 0 && (
            <div className="my-12">
              <AdBannerComponent
                banners={inlineBanners}
                placement="inline"
                variant="inline"
              />
            </div>
          )}

          {/* Sidebar Banner */}
          {sidebarBanners.length > 0 && (
            <div className="my-12 max-w-md mx-auto">
              <p className="font-heading font-bold uppercase text-xs tracking-[0.2em] text-black/40 mb-4 text-center">
                Sponsored
              </p>
              <AdBannerComponent
                banners={sidebarBanners}
                placement="sidebar"
                variant="card"
              />
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t pt-12">
              <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts
                  .filter((p) => p._id !== post._id)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <BlogCard key={relatedPost._id} post={relatedPost} />
                  ))}
              </div>
            </section>
          )}
        </article>
      </Container>
    </div>
  );
}

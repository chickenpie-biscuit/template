import { client } from '@/sanity/lib/client';
import { getPostBySlug, getFeaturedPosts, getActiveBanners } from '@/sanity/lib/queries';
import { Post, AdBanner } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/ui/BlogCard';
import PortableText from '@/components/sanity/PortableText';
import AdBannerComponent from '@/components/ui/AdBanner';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import ArticleSchema from '@/components/seo/ArticleSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

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

  // Generate OG image URL
  const ogImageUrl = post.seo?.ogImage 
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage
    ? urlFor(post.mainImage as any).width(1200).height(630).url()
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.com';
  const postUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: post.seo?.metaTitle || `${post.title} | Chickenpie`,
    description: post.seo?.metaDescription || post.excerpt || post.title,
    keywords: post.seo?.keywords || post.tags || [],
    alternates: {
      canonical: post.seo?.canonicalUrl || postUrl,
    },
    openGraph: {
      type: 'article',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || post.title,
      url: postUrl,
      siteName: 'Chickenpie',
      locale: 'en_US',
      publishedTime: post.publishedAt,
      authors: [post.author || 'Chickenpie'],
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: post.seo?.ogImage?.alt || post.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt || post.title,
      images: ogImageUrl ? [ogImageUrl] : [],
      creator: '@chickenpie',
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noFollow,
      googleBot: {
        index: !post.seo?.noIndex,
        follow: !post.seo?.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
    ? urlFor(post.mainImage as any).width(1400).height(700).url()
    : null;

  // Get sidebar banners
  const sidebarBanners = banners?.filter(b => b.placement === 'sidebar' && b.active) || [];
  const inlineBanners = banners?.filter(b => b.placement === 'inline' && b.active) || [];

  // Calculate reading time (approx 200 words per minute)
  const wordCount = post.body ? JSON.stringify(post.body).split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.com';
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <>
      {/* Structured Data - Article Schema */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.title}
        datePublished={post.publishedAt || new Date().toISOString()}
        dateModified={post._updatedAt || post.publishedAt || new Date().toISOString()}
        author={post.author || 'Chickenpie'}
        imageUrl={imageUrl || undefined}
        url={postUrl}
        category={post.categories?.[0]?.title}
        keywords={post.categories?.map(cat => cat.title) || []}
      />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Blog', url: `${siteUrl}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      
      <article className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        {imageUrl ? (
          <>
            <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                className="object-cover opacity-60"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <Container>
                <div className="pb-12 md:pb-16 lg:pb-20 max-w-4xl">
                  {/* Back Link */}
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center gap-2 text-cream/70 hover:text-cream mb-6 transition-colors font-heading text-sm uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </Link>

                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="px-3 py-1 bg-teal text-black font-heading font-bold uppercase text-xs tracking-wider border border-teal"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-cream leading-[0.95] mb-6">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-cream/80">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-goldenrod" />
                        <span className="font-body text-sm">{post.author}</span>
                      </div>
                    )}
                    {post.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-goldenrod" />
                        <time className="font-body text-sm" dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-goldenrod" />
                      <span className="font-body text-sm">{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </>
        ) : (
          /* No Image Hero */
          <div className="bg-gradient-to-br from-teal via-teal-200 to-goldenrod py-16 md:py-24">
            <Container>
              <div className="max-w-4xl">
                {/* Back Link */}
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-black/70 hover:text-black mb-6 transition-colors font-heading text-sm uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category._id}
                        className="px-3 py-1 bg-black text-cream font-heading font-bold uppercase text-xs tracking-wider"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-black leading-[0.95] mb-6">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-black/70">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-body text-sm">{post.author}</span>
                    </div>
                  )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time className="font-body text-sm" dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-body text-sm">{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article Content */}
            <div className="lg:col-span-8">
              {/* Excerpt */}
              {post.excerpt && (
                <div className="mb-10 p-6 bg-black/5 border-l-4 border-teal">
                  <p className="font-body text-lg md:text-xl text-black/80 leading-relaxed italic">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Article Body */}
              {post.body && (
                <div className="
                  font-body text-lg text-black/90 leading-relaxed
                  [&_h1]:font-heading [&_h1]:font-bold [&_h1]:uppercase [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:text-black [&_h1]:mt-12 [&_h1]:mb-6
                  [&_h2]:font-heading [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-black [&_h2]:mt-10 [&_h2]:mb-5
                  [&_h3]:font-heading [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:text-black [&_h3]:mt-8 [&_h3]:mb-4
                  [&_h4]:font-heading [&_h4]:font-bold [&_h4]:uppercase [&_h4]:text-lg [&_h4]:text-black [&_h4]:mt-6 [&_h4]:mb-3
                  [&_p]:mb-6 [&_p]:leading-relaxed
                  [&_a]:text-teal [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-black [&_a]:transition-colors
                  [&_strong]:text-black [&_strong]:font-bold
                  [&_em]:italic
                  [&_code]:bg-black [&_code]:text-teal [&_code]:px-2 [&_code]:py-1 [&_code]:font-mono [&_code]:text-sm
                  [&_pre]:bg-black [&_pre]:text-cream [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:my-8 [&_pre]:border-4 [&_pre]:border-black
                  [&_blockquote]:border-l-4 [&_blockquote]:border-goldenrod [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:bg-goldenrod/10 [&_blockquote]:italic [&_blockquote]:text-black/80
                  [&_ul]:my-6 [&_ul]:ml-0 [&_ul]:space-y-3
                  [&_ol]:my-6 [&_ol]:ml-0 [&_ol]:space-y-3 [&_ol]:list-decimal [&_ol]:list-inside
                  [&_li]:flex [&_li]:items-start [&_li]:gap-3
                  [&_ul_li]:before:content-['→'] [&_ul_li]:before:text-teal [&_ul_li]:before:font-bold [&_ul_li]:before:flex-shrink-0
                  [&_img]:my-8 [&_img]:border-4 [&_img]:border-black [&_img]:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  [&_hr]:my-12 [&_hr]:border-t-2 [&_hr]:border-black/20
                ">
                  <PortableText content={post.body} />
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t-2 border-black/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="font-heading font-bold uppercase text-sm tracking-wider text-black/60">
                    Share this article
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 bg-black text-cream flex items-center justify-center hover:bg-teal hover:text-black transition-colors border-2 border-black">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Inline Banner - After Content */}
              {inlineBanners.length > 0 && (
                <div className="mt-12">
                  <AdBannerComponent
                    banners={inlineBanners}
                    placement="inline"
                    variant="inline"
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* Author Card */}
                {post.author && (
                  <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-heading font-bold uppercase text-xs tracking-widest text-black/50 mb-4">
                      Written By
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal to-goldenrod border-2 border-black flex items-center justify-center">
                        <User className="w-8 h-8 text-black" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-lg text-black uppercase">
                          {post.author}
                        </p>
                        <p className="font-body text-sm text-black/60">Contributor</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-heading font-bold uppercase text-xs tracking-widest text-black/50 mb-4">
                      Categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="px-3 py-2 bg-teal/10 text-black font-heading font-bold uppercase text-xs tracking-wider border-2 border-teal/30 hover:bg-teal hover:border-teal transition-colors cursor-pointer"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar Banner */}
                {sidebarBanners.length > 0 && (
                  <div>
                    <p className="font-heading font-bold uppercase text-xs tracking-widest text-black/40 mb-3">
                      Sponsored
                    </p>
                    <AdBannerComponent
                      banners={sidebarBanners}
                      placement="sidebar"
                      variant="card"
                    />
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 1 && (
        <section className="py-16 bg-black">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-cream">
                More Articles
              </h2>
              <Link 
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-transparent text-cream border-2 border-cream font-heading font-bold uppercase text-sm hover:bg-cream hover:text-black transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts
                .filter((p) => p._id !== post._id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <BlogCard key={relatedPost._id} post={relatedPost} variant="dark" />
                ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-black border-2 border-cream font-heading font-bold uppercase text-sm hover:bg-transparent hover:text-cream transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

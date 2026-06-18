import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';

// Queries for sitemap
const sitemapFeedPostsQuery = groq`*[_type == "feedPost" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

const sitemapBlogPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

const sitemapProductsQuery = groq`*[_type == "product" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

const sitemapStudioProjectsQuery = groq`*[_type == "studioProject" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

const sitemapPagesQuery = groq`*[_type == "page" && defined(slug.current)] {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

interface SitemapItem {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their priorities
  // lastModified uses real known-good dates, not build time, so Google sees meaningful change signals
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/studio`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Legal pages
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/affiliate-disclaimer`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // If Sanity client is not configured, return only static pages
  if (!client) {
    return staticPages;
  }

  try {
    // Fetch all dynamic content in parallel
    const [feedPosts, blogPosts, products, studioProjects, pages] = await Promise.all([
      client.fetch<SitemapItem[]>(sitemapFeedPostsQuery).catch(() => []),
      client.fetch<SitemapItem[]>(sitemapBlogPostsQuery).catch(() => []),
      client.fetch<SitemapItem[]>(sitemapProductsQuery).catch(() => []),
      client.fetch<SitemapItem[]>(sitemapStudioProjectsQuery).catch(() => []),
      client.fetch<SitemapItem[]>(sitemapPagesQuery).catch(() => []),
    ]);

    // Feed posts (main content)
    const feedPostUrls: MetadataRoute.Sitemap = feedPosts.map((post) => ({
      url: `${BASE_URL}/feed/${post.slug}`,
      lastModified: new Date(post.publishedAt || post._updatedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Blog posts
    const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || post._updatedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Products
    const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${BASE_URL}/shop/${product.slug}`,
      lastModified: new Date(product.publishedAt || product._updatedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Studio projects
    const studioUrls: MetadataRoute.Sitemap = studioProjects.map((project) => ({
      url: `${BASE_URL}/studio/${project.slug}`,
      lastModified: new Date(project.publishedAt || project._updatedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Dynamic pages from Sanity
    const pageUrls: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date(page.publishedAt || page._updatedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [
      ...staticPages,
      ...feedPostUrls,
      ...blogPostUrls,
      ...productUrls,
      ...studioUrls,
      ...pageUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}

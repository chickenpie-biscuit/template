import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.com';

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
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/studio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(post.publishedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Blog posts
    const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(post.publishedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Products
    const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${BASE_URL}/shop/${product.slug}`,
      lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(product.publishedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Studio projects
    const studioUrls: MetadataRoute.Sitemap = studioProjects.map((project) => ({
      url: `${BASE_URL}/studio/${project.slug}`,
      lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(project.publishedAt || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Dynamic pages from Sanity
    const pageUrls: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(page.publishedAt || Date.now()),
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

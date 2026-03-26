import { client } from '@/sanity/lib/client';
import { getFeedPostBySlug, getActiveBanners } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdBanner } from '@/types/sanity';
import AdBannerComponent from '@/components/ui/AdBanner';
import Container from '@/components/ui/Container';

// Import Layout Components
import ArtLayout from '@/components/layouts/ArtLayout';
import CommerceLayout from '@/components/layouts/CommerceLayout';
import BlogLayout from '@/components/layouts/BlogLayout';
import DesignWorkLayout from '@/components/layouts/DesignWorkLayout';
import PromptWeekLayout from '@/components/layouts/PromptWeekLayout';
import ChroniclesLayout from '@/components/layouts/ChroniclesLayout';
import ToolTuesdayLayout from '@/components/layouts/ToolTuesdayLayout';
import SolopreneurLayout from '@/components/layouts/SolopreneurLayout';
import SundaySwingsLayout from '@/components/layouts/SundaySwingsLayout';
import NomNomLayout from '@/components/layouts/NomNomLayout';
import CourseReviewLayout from '@/components/layouts/CourseReviewLayout';
import QuoteLayout from '@/components/layouts/QuoteLayout';
import ArticleSchema from '@/components/seo/ArticleSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import NewsletterSignup from '@/components/ui/NewsletterSignup';

interface FeedPostPageProps {
  params: { slug: string };
}

export const revalidate = 60;

// Category labels for SEO
const categoryLabels: Record<string, string> = {
  'design-work': 'Design Work',
  'art': 'Art',
  'merch-drops': 'Merch Drop',
  'prompt-week': 'Prompt of the Week',
  'chronicles': 'Chicken Chronicles',
  'nom-nom': 'Nom Nom Recipe',
  'tool-tuesday': 'Tool Tuesday',
  'solopreneur': 'Solopreneur Sundays',
  'sunday-swings': 'Sunday Swings',
  'course-review': 'Course Review',
  'quotes': 'Quotes',
};

export async function generateMetadata({
  params,
}: FeedPostPageProps): Promise<Metadata> {
  const post = await client?.fetch(getFeedPostBySlug, { slug: params.slug }).catch(() => null);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Generate OG image URL (prioritize SEO ogImage, then featuredImage)
  const ogImageUrl = post.seo?.ogImage
    ? urlFor(post.seo.ogImage as any).width(1200).height(630).url()
    : post.featuredImage 
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : null;
  
  const safeCategory = typeof post.category === 'string' ? post.category : '';
  const categoryLabel = categoryLabels[safeCategory] || safeCategory || 'Uncategorized';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';
  const postUrl = `${siteUrl}/feed/${post.slug}`;
  
  // Combine SEO keywords with category
  const allKeywords = [
    ...(post.seo?.keywords || []),
    categoryLabel,
    'Chickenpie',
    'creative',
    'design',
    post.title
  ].filter(Boolean);

  return {
    title: post.seo?.metaTitle || `${post.title} | Chickenpie`,
    description: post.seo?.metaDescription || post.description || `${categoryLabel} - Creative content from Chickenpie`,
    keywords: allKeywords,
    authors: [{ name: 'Chickenpie' }],
    creator: 'Chickenpie',
    publisher: 'Chickenpie',
    
    // Canonical URL
    alternates: {
      canonical: post.seo?.canonicalUrl || postUrl,
    },
    
    // Open Graph
    openGraph: {
      type: 'article',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description || `${categoryLabel} - Creative content from Chickenpie`,
      url: postUrl,
      siteName: 'Chickenpie',
      locale: 'en_US',
      publishedTime: post.publishedAt,
      authors: ['Chickenpie'],
      images: ogImageUrl ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.seo?.ogImage?.alt || post.title,
        },
      ] : [],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description || `${categoryLabel} - Creative content from Chickenpie`,
      images: ogImageUrl ? [ogImageUrl] : [],
      creator: '@chickenpie',
    },
    
    // Robots
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

export default async function FeedPostPage({ params }: FeedPostPageProps) {
  // Fetch post and banners in parallel
  const [post, banners] = await Promise.all([
    client?.fetch(getFeedPostBySlug, { slug: params.slug }).catch(() => null),
    client?.fetch<AdBanner[]>(getActiveBanners).catch(() => []) ?? [],
  ]);

  if (!post) {
    notFound();
  }

  // Normalize category - some posts have category as a reference object instead of a string
  const postCategory = typeof post.category === 'string' ? post.category : '';

  // Determine Layout based on Category
  let LayoutComponent = BlogLayout;

  if (postCategory === 'design-work') {
    LayoutComponent = DesignWorkLayout;
  } else if (postCategory === 'art') {
    LayoutComponent = ArtLayout;
  } else if (postCategory === 'merch-drops') {
    LayoutComponent = CommerceLayout;
  } else if (postCategory === 'prompt-week') {
    LayoutComponent = PromptWeekLayout;
  } else if (postCategory === 'chronicles') {
    LayoutComponent = ChroniclesLayout;
  } else if (postCategory === 'tool-tuesday') {
    LayoutComponent = ToolTuesdayLayout;
  } else if (postCategory === 'solopreneur') {
    LayoutComponent = SolopreneurLayout;
  } else if (postCategory === 'sunday-swings') {
    LayoutComponent = SundaySwingsLayout;
  } else if (postCategory === 'nom-nom') {
    LayoutComponent = NomNomLayout;
  } else if (postCategory === 'course-review') {
    LayoutComponent = CourseReviewLayout;
  } else if (postCategory === 'quotes') {
    LayoutComponent = QuoteLayout;
  }

  // Hide back button on commerce pages (merch drops have their own navigation style)
  const showBackButton = postCategory !== 'merch-drops';
  
  // Show sidebar banner on certain layouts
  const showSidebarBanner = ['art', 'chronicles', 'prompt-week', 'tool-tuesday', 'solopreneur', 'sunday-swings', 'nom-nom'].includes(postCategory);
  const sidebarBanners = banners?.filter(b => b.placement === 'sidebar') || [];

  // SEO data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';
  const postUrl = `${siteUrl}/feed/${params.slug}`;
  const categoryLabel = categoryLabels[postCategory] || postCategory || 'Uncategorized';
  const imageUrl = post.featuredImage 
    ? urlFor(post.featuredImage).width(1200).height(630).url()
    : null;

  return (
    <>
      {/* Structured Data - Article Schema */}
      <ArticleSchema
        title={post.title}
        description={post.description || categoryLabel}
        datePublished={post.publishedAt || new Date().toISOString()}
        dateModified={post._updatedAt || post.publishedAt || new Date().toISOString()}
        author={typeof post.author === 'string' ? post.author : 'Chickenpie'}
        imageUrl={imageUrl || undefined}
        url={postUrl}
        category={categoryLabel}
        keywords={[categoryLabel]}
      />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: categoryLabel, url: `${siteUrl}/?filter=${postCategory}` },
          { name: post.title, url: postUrl },
        ]}
      />
      
      {/* Global Back Button (Fixed) - Positioned below header areas to avoid overlap */}
      {showBackButton && (
        <div className="fixed top-40 left-6 z-[45] hidden lg:block">
          <Link 
            href="/" 
            className="flex items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft size={20} />
            </div>
            <span className="font-heading font-bold uppercase text-xs tracking-widest text-black bg-white px-3 py-1.5 border border-black/10 shadow-sm">
              Back
            </span>
          </Link>
        </div>
      )}

      {/* Render Specific Layout */}
      <LayoutComponent post={post} />

      {/* Newsletter CTA */}
      {postCategory !== 'merch-drops' && (
        <NewsletterSignup source="feed-post" variant="banner" />
      )}

      {/* Post-Content Banner Section */}
      {sidebarBanners.length > 0 && showSidebarBanner && (
        <section className="bg-cream py-12 border-t-2 border-black">
          <Container>
            <div className="max-w-4xl mx-auto">
              <p className="font-heading font-bold uppercase text-xs tracking-[0.2em] text-black/40 mb-4 text-center">
                You might also like
              </p>
              <AdBannerComponent
                banners={sidebarBanners}
                placement="sidebar"
                variant="card"
              />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

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
import ArticleSchema from '@/components/seo/ArticleSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

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
  
  const categoryLabel = categoryLabels[post.category] || post.category;
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

  // Determine Layout based on Category
  let LayoutComponent = BlogLayout;

  if (post.category === 'design-work') {
    LayoutComponent = DesignWorkLayout;
  } else if (post.category === 'art') {
    LayoutComponent = ArtLayout;
  } else if (post.category === 'merch-drops') {
    LayoutComponent = CommerceLayout;
  } else if (post.category === 'prompt-week') {
    LayoutComponent = PromptWeekLayout;
  } else if (post.category === 'chronicles') {
    LayoutComponent = ChroniclesLayout;
  } else if (post.category === 'tool-tuesday') {
    LayoutComponent = ToolTuesdayLayout;
  } else if (post.category === 'solopreneur') {
    LayoutComponent = SolopreneurLayout;
  } else if (post.category === 'sunday-swings') {
    LayoutComponent = SundaySwingsLayout;
  } else if (post.category === 'nom-nom') {
    LayoutComponent = NomNomLayout;
  } else if (post.category === 'course-review') {
    LayoutComponent = CourseReviewLayout;
  }

  // Hide back button on commerce pages (merch drops have their own navigation style)
  const showBackButton = post.category !== 'merch-drops';
  
  // Show sidebar banner on certain layouts
  const showSidebarBanner = ['art', 'chronicles', 'prompt-week', 'tool-tuesday', 'solopreneur', 'sunday-swings', 'nom-nom'].includes(post.category);
  const sidebarBanners = banners?.filter(b => b.placement === 'sidebar') || [];

  // SEO data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';
  const postUrl = `${siteUrl}/feed/${params.slug}`;
  const categoryLabel = categoryLabels[post.category] || post.category;
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
        author={post.author || 'Chickenpie'}
        imageUrl={imageUrl || undefined}
        url={postUrl}
        category={categoryLabel}
        keywords={[categoryLabel]}
      />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: categoryLabel, url: `${siteUrl}/?filter=${post.category}` },
          { name: post.title, url: postUrl },
        ]}
      />
      
      {/* Global Back Button (Fixed) - Hidden on commerce layouts, z-[45] to be above layout elements */}
      {showBackButton && (
        <div className="fixed top-28 left-6 z-[45] hidden lg:block">
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-black bg-cream flex items-center justify-center group-hover:bg-black group-hover:text-cream transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft size={18} />
            </div>
            <span className="font-heading font-bold uppercase text-xs tracking-widest text-black opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-cream px-2 py-1">
              Back
            </span>
          </Link>
        </div>
      )}

      {/* Render Specific Layout */}
      <LayoutComponent post={post} />

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

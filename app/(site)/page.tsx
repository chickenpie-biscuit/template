import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory, getActiveBanners } from '@/sanity/lib/queries';
import FilterBar from '@/components/ui/FilterBar';
import FeedContent from '@/components/ui/FeedContent';
import { AdBanner } from '@/types/sanity';
import WebSiteSchema from '@/components/seo/WebSiteSchema';

export const revalidate = 60; // Revalidate every 60 seconds

interface HomePageProps {
  searchParams: { filter?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const filter = searchParams?.filter || 'all';

  // Safe fetch with error handling
  let posts: any[] = [];
  let banners: AdBanner[] = [];
  
  try {
    if (!client) {
      console.error('Sanity client not configured');
      posts = [];
      banners = [];
    } else {
      const [postsData, bannersData] = await Promise.all([
        filter === 'all'
          ? client.fetch(getAllFeedPosts).catch((err) => {
              console.error('Failed to fetch all posts:', err.message || err);
              return [];
            })
          : client.fetch(getFeedPostsByCategory, { category: filter }).catch((err) => {
              console.error('Failed to fetch posts by category:', err.message || err);
              return [];
            }),
        client.fetch<AdBanner[]>(getActiveBanners).catch((err) => {
          console.error('Failed to fetch banners:', err.message || err);
          return [];
        }),
      ]);
      posts = postsData ?? [];
      banners = bannersData ?? [];
    }
  } catch (error: any) {
    console.error('Feed fetch error:', error?.message || error);
    posts = [];
    banners = [];
  }

  return (
    <>
      {/* Structured Data - WebSite Schema */}
      <WebSiteSchema />
      
      <div className="min-h-screen bg-cream w-full">
        <FilterBar />
        <FeedContent initialPosts={posts} initialFilter={filter} banners={banners} />
      </div>
    </>
  );
}

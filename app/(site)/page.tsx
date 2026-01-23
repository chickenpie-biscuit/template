import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory, getActiveBanners } from '@/sanity/lib/queries';
import FilterBar from '@/components/ui/FilterBar';
import FeedContent from '@/components/ui/FeedContent';
import { AdBanner } from '@/types/sanity';

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
    const [postsData, bannersData] = await Promise.all([
      filter === 'all'
        ? client?.fetch(getAllFeedPosts).catch(() => [])
        : client?.fetch(getFeedPostsByCategory, { category: filter }).catch(() => []),
      client?.fetch<AdBanner[]>(getActiveBanners).catch(() => []),
    ]);
    posts = postsData ?? [];
    banners = bannersData ?? [];
  } catch (error) {
    console.error('Feed fetch error:', error);
  }

  return (
    <div className="min-h-screen bg-cream w-full">
      <FilterBar />
      <FeedContent initialPosts={posts} initialFilter={filter} banners={banners} />
    </div>
  );
}

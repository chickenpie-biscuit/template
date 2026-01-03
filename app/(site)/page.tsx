import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory } from '@/sanity/lib/queries';
import FeedPostCard from '@/components/ui/FeedPostCard';
import FilterBar from '@/components/ui/FilterBar';
import FeedContent from '@/components/ui/FeedContent';

export const revalidate = 60; // Revalidate every 60 seconds

interface HomePageProps {
  searchParams: { filter?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const filter = searchParams?.filter || 'all';

  const posts =
    filter === 'all'
      ? await client?.fetch(getAllFeedPosts).catch(() => []) ?? []
      : await client?.fetch(getFeedPostsByCategory, { category: filter }).catch(() => []) ?? [];

  return (
    <div className="min-h-screen bg-cream">
      <FilterBar />
      <FeedContent initialPosts={posts} initialFilter={filter} />
    </div>
  );
}

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedPostCard from './FeedPostCard';
import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory } from '@/sanity/lib/queries';

interface FeedPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage?: any;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  price?: number;
  originalPrice?: number;
  findPrice?: string;
  findHighlight?: string;
}

interface FeedContentProps {
  initialPosts: FeedPost[];
  initialFilter: string;
}

const POSTS_PER_PAGE = 12;

export default function FeedContent({ initialPosts, initialFilter }: FeedContentProps) {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length >= POSTS_PER_PAGE);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset when filter changes
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      setLoading(true);
      try {
        const query = filter === 'all' ? getAllFeedPosts : getFeedPostsByCategory;
        const params = filter === 'all' ? {} : { category: filter };
        console.log('Fetching posts for filter:', filter, 'with params:', params); // Debug
        const newPosts = await client?.fetch(query, params).catch(() => []) ?? [];
        console.log('Fetched posts:', newPosts.length); // Debug
        setPosts(newPosts.slice(0, POSTS_PER_PAGE));
        setPage(1);
        setHasMore(newPosts.length >= POSTS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    // Always fetch when filter changes
    setPosts(initialPosts);
    if (filter !== initialFilter) {
      fetchFilteredPosts();
    }
  }, [filter, initialFilter, initialPosts]);

  const loadMorePosts = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const query = filter === 'all' ? getAllFeedPosts : getFeedPostsByCategory;
      const params = filter === 'all' ? {} : { category: filter };
      const allPosts = await client?.fetch(query, params).catch(() => []) ?? [];
      const nextPage = page + 1;
      const startIndex = nextPage * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const newPosts = allPosts.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage(nextPage);
        setHasMore(endIndex < allPosts.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, loading, page]);

  // Infinite scroll
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [hasMore, loading, filter, loadMorePosts]);

  return (
    <div className="w-full px-6 py-8">
      {posts.length > 0 ? (
        <>
          {/* Masonry Grid - Full Width */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="break-inside-avoid">
                <FeedPostCard post={post} />
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-8">
              <p className="font-body text-black/60">Loading more posts...</p>
            </div>
          )}

          {/* Observer target for infinite scroll */}
          <div ref={observerTarget} className="h-4" />
        </>
      ) : (
        <div className="text-center py-16">
          <p className="font-body text-black/60 text-lg">
            No posts found for this category. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}


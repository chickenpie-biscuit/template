'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedPostCard from './FeedPostCard';
import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory } from '@/sanity/lib/queries';

interface FeedPost {
  _id: string;
  _type?: string;
  title: string;
  slug: string;
  category?: string;
  featuredImage?: any;
  mainImage?: any;
  description?: string;
  excerpt?: string;
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
    <div className="w-full px-4 md:px-6 py-8">
      {posts.length > 0 ? (
        <>
          {/* Bento-style Grid - Auto-sizing based on content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[200px] gap-4 md:gap-6">
            {posts.map((post, index) => {
              // Create varied sizes for bento effect
              const variants = [
                'col-span-1 row-span-1', // Small square
                'col-span-1 row-span-2', // Tall
                'col-span-2 row-span-1', // Wide
                'col-span-2 row-span-2', // Large square
                'col-span-1 row-span-1', // Small square
                'col-span-2 row-span-2', // Large square
              ];
              
              // Assign size based on category and index
              let sizeClass = variants[index % variants.length];
              
              // Special sizing for categories
              if (post.category === 'merch-drops') {
                sizeClass = 'col-span-1 row-span-1'; // Keep products square and small
              } else if (post.category === 'finds') {
                sizeClass = index % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-2';
              } else if (post.category === 'thoughts' || post._type === 'post') {
                sizeClass = index % 4 === 0 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1';
              }
              
              return (
                <div key={post._id} className={sizeClass}>
                  <FeedPostCard post={post} />
                </div>
              );
            })}
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


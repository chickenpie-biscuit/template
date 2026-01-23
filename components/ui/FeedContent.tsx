'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedPostCard from './FeedPostCard';
import SkeletonCard from './SkeletonCard';
import AdBannerComponent from './AdBanner';
import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory } from '@/sanity/lib/queries';
import { AdBanner } from '@/types/sanity';

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
  banners?: AdBanner[];
}

const POSTS_PER_PAGE = 12;
const BANNER_INTERVAL = 6; // Show banner every 6 posts

export default function FeedContent({ initialPosts, initialFilter, banners = [] }: FeedContentProps) {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length >= POSTS_PER_PAGE);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get inline banners
  const inlineBanners = banners.filter(b => b.placement === 'inline' && b.active);

  // CSS-based animation instead of GSAP for better performance
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Use CSS transitions with staggered delays
    const items = containerRef.current.querySelectorAll('.feed-item:not(.animated)');
    items.forEach((item, index) => {
      const element = item as HTMLElement;
      // Stagger the animation with CSS
      element.style.transitionDelay = `${index * 50}ms`;
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        element.classList.add('animated');
      });
    });
  }, [posts]);

  // Reset when filter changes
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      setLoading(true);
      try {
        const query = filter === 'all' ? getAllFeedPosts : getFeedPostsByCategory;
        const params = filter === 'all' ? {} : { category: filter };
        const newPosts = await client?.fetch(query, params).catch(() => []) ?? [];
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

  // Create posts array with inline banners inserted
  const postsWithBanners = () => {
    if (inlineBanners.length === 0) return posts;
    
    const result: (FeedPost | { type: 'banner'; index: number })[] = [];
    let bannerIndex = 0;
    
    posts.forEach((post, index) => {
      result.push(post);
      
      // Insert banner after every BANNER_INTERVAL posts
      if ((index + 1) % BANNER_INTERVAL === 0 && inlineBanners.length > 0) {
        result.push({ type: 'banner', index: bannerIndex });
        bannerIndex = (bannerIndex + 1) % inlineBanners.length;
      }
    });
    
    return result;
  };

  const contentItems = postsWithBanners();

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-8" ref={containerRef}>
      {posts.length > 0 ? (
        <>
          {/* Masonry Grid - Tighter spacing for cohesive look */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 md:gap-5">
            {contentItems.map((item, idx) => {
              // Check if this is a banner placeholder
              if ('type' in item && item.type === 'banner') {
                return (
                  <div 
                    key={`banner-${item.index}-${idx}`} 
                    className="break-inside-avoid mb-4 md:mb-5 col-span-full feed-item opacity-0 translate-y-4 transition-all duration-500 ease-out [&.animated]:opacity-100 [&.animated]:translate-y-0"
                    style={{ columnSpan: 'all' }}
                  >
                    <AdBannerComponent
                      banners={[inlineBanners[item.index]]}
                      variant="card"
                    />
                  </div>
                );
              }
              
              // Regular post
              const post = item as FeedPost;
              return (
                <div 
                  key={post._id} 
                  className="break-inside-avoid mb-4 md:mb-5 feed-item opacity-0 translate-y-4 transition-all duration-500 ease-out [&.animated]:opacity-100 [&.animated]:translate-y-0"
                >
                  <FeedPostCard post={post} />
                </div>
              );
            })}
          </div>

          {/* Loading indicator with skeleton cards */}
          {loading && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 md:gap-5 mt-4 md:mt-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="break-inside-avoid mb-4 md:mb-5">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          )}

          {/* Observer target for infinite scroll */}
          <div ref={observerTarget} className="h-4" />
        </>
      ) : loading ? (
        // Initial loading state
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 md:gap-5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="break-inside-avoid mb-4 md:mb-5">
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-block border-2 border-black bg-cream p-8">
            <p className="font-heading text-2xl font-bold uppercase text-black mb-2">
              No posts yet
            </p>
            <p className="font-body text-sm text-black/60">
              Check back soon for new content!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedPostCard from './FeedPostCard';
import SkeletonCard from './SkeletonCard';
import AdBannerComponent from './AdBanner';
import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getAllFeedPostsAsc, getFeedPostsByCategory, getFeedPostsByCategoryAsc } from '@/sanity/lib/queries';
import { AdBanner } from '@/types/sanity';

interface FeedPost {
  _id: string;
  _type?: string;
  title: string;
  slug: string;
  category?: string;
  featuredImage?: any;
  featuredVideo?: any;
  videoUrl?: string;
  mediaType?: 'image' | 'video' | 'external-video';
  mainImage?: any;
  description?: string;
  excerpt?: string;
  ctaText?: string;
  ctaLink?: string;
  price?: number;
  originalPrice?: number;
  findPrice?: string;
  findHighlight?: string;
  likes?: number;
  // Merch Drops fields (synced with Product schema)
  shortDescription?: string;
  stock?: number;
  limitedQuantity?: boolean;
  dropDate?: string;
  productType?: string;
  sizes?: string[];
  sku?: string;
  downloadUrl?: string;
  productGallery?: any[];
  // Date
  publishedAt?: string;
}

interface FeedContentProps {
  initialPosts: FeedPost[];
  initialFilter: string;
  banners?: AdBanner[];
}

const POSTS_PER_PAGE = 30; // Load more posts per batch for smoother scrolling
const BANNER_INTERVAL = 15; // Show banner every 15 posts

export default function FeedContent({ initialPosts, initialFilter, banners = [] }: FeedContentProps) {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const [allPostsCache, setAllPostsCache] = useState<FeedPost[]>([]); // Cache all posts to avoid refetching
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false); // Prevent duplicate loads

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

  // Reset when filter or sort changes - fetch ALL posts and cache them
  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      isLoadingRef.current = true;
      
      try {
        let query;
        if (filter === 'all') {
          query = sort === 'oldest' ? getAllFeedPostsAsc : getAllFeedPosts;
        } else {
          query = sort === 'oldest' ? getFeedPostsByCategoryAsc : getFeedPostsByCategory;
        }
        
        const params = filter === 'all' ? {} : { category: filter };
        const fetchedPosts = await client?.fetch(query, params).catch(() => []) ?? [];
        
        // Cache all posts for infinite scroll
        setAllPostsCache(fetchedPosts);
        
        // Show first batch
        setPosts(fetchedPosts.slice(0, POSTS_PER_PAGE));
        setPage(1);
        setHasMore(fetchedPosts.length > POSTS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    };

    fetchAllPosts();
  }, [filter, sort]);

  const loadMorePosts = useCallback(() => {
    // Prevent duplicate loads
    if (isLoadingRef.current || loading || !hasMore) return;
    
    isLoadingRef.current = true;
    setLoading(true);

    // Use cached posts instead of refetching
    const nextPage = page + 1;
    const endIndex = nextPage * POSTS_PER_PAGE;
    const newPosts = allPostsCache.slice(0, endIndex);

    if (newPosts.length > posts.length) {
      setPosts(newPosts);
      setPage(nextPage);
      setHasMore(endIndex < allPostsCache.length);
    } else {
      setHasMore(false);
    }

    // Small delay to prevent rapid-fire loading
    setTimeout(() => {
      setLoading(false);
      isLoadingRef.current = false;
    }, 100);
  }, [allPostsCache, loading, page, posts.length, hasMore]);

  // Infinite scroll - trigger earlier for smoother experience
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
          loadMorePosts();
        }
      },
      { 
        threshold: 0,
        rootMargin: '400px' // Start loading before user reaches the end
      }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [hasMore, loadMorePosts]);

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
                    className="break-inside-avoid mb-4 md:mb-5 feed-item opacity-0 translate-y-4 transition-all duration-500 ease-out [&.animated]:opacity-100 [&.animated]:translate-y-0"
                  >
                    <AdBannerComponent
                      banners={[inlineBanners[item.index]]}
                      variant="feedpost"
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

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-3 bg-cream border-2 border-black px-6 py-3">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span className="font-heading text-sm uppercase tracking-wider">Loading more...</span>
              </div>
            </div>
          )}

          {/* Observer target for infinite scroll */}
          <div ref={observerTarget} className="h-20" />
          
          {/* Load more button as fallback */}
          {hasMore && !loading && (
            <div className="flex justify-center py-8">
              <button
                onClick={loadMorePosts}
                className="bg-black text-cream px-8 py-4 font-heading font-bold uppercase text-sm tracking-wider border-2 border-black hover:bg-goldenrod hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Load More Posts
              </button>
            </div>
          )}
          
          {/* End of feed indicator */}
          {!hasMore && posts.length > 0 && (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="inline-block bg-cream border-2 border-black/20 px-6 py-3">
                  <span className="font-heading text-sm uppercase tracking-wider text-black/50">
                    ✦ You&apos;ve seen it all ✦
                  </span>
                </div>
              </div>
            </div>
          )}
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

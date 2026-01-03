'use client';

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedPostCard from './FeedPostCard';
import SkeletonCard from './SkeletonCard';
import { client } from '@/sanity/lib/client';
import { getAllFeedPosts, getFeedPostsByCategory } from '@/sanity/lib/queries';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for new posts
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create context for cleanup
    const ctx = gsap.context(() => {
      // Animate feed items that haven't been animated yet
      const items = gsap.utils.toArray('.feed-item:not(.animated)');
      
      if (items.length > 0) {
        gsap.fromTo(items, 
          { 
            y: 100, 
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            onComplete: () => {
              items.forEach((item: any) => item.classList.add('animated'));
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom-=100',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [posts]); // Re-run when posts change

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
    <div className="w-full px-4 md:px-6 lg:px-8 py-8" ref={containerRef}>
      {posts.length > 0 ? (
        <>
          {/* Masonry Grid - Tighter spacing for cohesive look */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 md:gap-5">
            {posts.map((post) => (
              <div key={post._id} className="break-inside-avoid mb-4 md:mb-5 feed-item opacity-0">
                <FeedPostCard post={post} />
              </div>
            ))}
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


'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Clock, ArrowRight, Eye } from 'lucide-react';

interface FeedPost {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  featuredImage?: any;
  mainImage?: any;
  description?: string;
  excerpt?: string;
  body?: any[];
}

interface CardHoverPreviewProps {
  post: FeedPost;
  children: React.ReactNode;
  disabled?: boolean;
}

// Estimate reading time from body content or description
const estimateReadingTime = (post: FeedPost): number => {
  let wordCount = 0;
  
  // Count words in description
  if (post.description) {
    wordCount += post.description.split(/\s+/).length;
  }
  
  // Count words in body (if available as portable text)
  if (post.body && Array.isArray(post.body)) {
    post.body.forEach((block: any) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: any) => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).length;
          }
        });
      }
    });
  }
  
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes); // At least 1 minute
};

const categoryLabels: Record<string, string> = {
  'design-work': 'Design Stuff',
  'art': 'Gallery',
  'merch-drops': 'Drop',
  'prompt-week': 'Prompt of the Week',
  'chronicles': 'Chicken Chronicles',
  'tool-tuesday': 'Tool Tuesday',
  'solopreneur': 'Solopreneur Sundays',
  'sunday-swings': 'Sunday Swings',
  'nom-nom': 'Nom Nom',
  'quotes': 'Quote',
  'course-review': 'Course Review',
};

export default function CardHoverPreview({ post, children, disabled = false }: CardHoverPreviewProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const image = post.featuredImage || post.mainImage;
  const imageUrl = image
    ? urlFor(image).width(600).height(400).url()
    : null;

  const displayDescription = post.description || post.excerpt || '';
  const truncatedDescription = displayDescription.length > 150 
    ? displayDescription.substring(0, 150) + '...' 
    : displayDescription;
  
  const readingTime = estimateReadingTime(post);
  const category = post.category || 'thoughts';
  const categoryLabel = categoryLabels[category] || category;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Preview dimensions (approximate)
    const previewWidth = 320;
    const previewHeight = 400;
    
    // Calculate position - offset from cursor
    let x = e.clientX + 20;
    let y = e.clientY - 100;
    
    // Keep within viewport bounds
    if (x + previewWidth > viewportWidth - 20) {
      x = e.clientX - previewWidth - 20;
    }
    if (y < 20) {
      y = 20;
    }
    if (y + previewHeight > viewportHeight - 20) {
      y = viewportHeight - previewHeight - 20;
    }
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    
    setIsHovering(true);
    // Delay showing preview to avoid flashing on quick passes
    timeoutRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowPreview(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Don't show preview for certain categories
  const noPreviewCategories = ['quotes', 'art'];
  const shouldShowPreview = !noPreviewCategories.includes(category) && !disabled;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {children}
      
      {/* Hover Preview Portal */}
      {shouldShowPreview && showPreview && isHovering && (
        <div
          className="fixed z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-200"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div className="w-80 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* Preview Image */}
            {imageUrl && (
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-cream">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Category badge on image */}
                <div className="absolute top-3 left-3 bg-goldenrod px-2 py-1">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-black">
                    {categoryLabel}
                  </span>
                </div>
                
                {/* Quick View indicator */}
                <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="font-heading text-[10px] font-bold uppercase text-white">
                    Preview
                  </span>
                </div>
              </div>
            )}
            
            {/* Preview Content */}
            <div className="p-4 bg-white">
              {/* Title */}
              <h4 className="font-heading text-base font-bold uppercase text-black leading-tight mb-2 line-clamp-2">
                {post.title}
              </h4>
              
              {/* Description */}
              {truncatedDescription && (
                <p className="font-body text-xs text-black/70 mb-3 line-clamp-3 leading-relaxed">
                  {truncatedDescription}
                </p>
              )}
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-black/10">
                {/* Reading time */}
                <div className="flex items-center gap-1 text-black/50">
                  <Clock className="w-3 h-3" />
                  <span className="font-heading text-[10px] uppercase tracking-wider">
                    {readingTime} min read
                  </span>
                </div>
                
                {/* CTA */}
                <div className="flex items-center gap-1 bg-black text-goldenrod px-3 py-1.5">
                  <span className="font-heading text-[10px] font-bold uppercase">
                    Read More
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

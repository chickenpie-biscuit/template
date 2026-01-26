'use client';

import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  postId: string;
  initialLikes?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'card';
  className?: string;
}

export default function LikeButton({ 
  postId, 
  initialLikes = 0, 
  size = 'md',
  variant = 'default',
  className = '' 
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if user has already liked this post (stored in localStorage)
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setIsLiked(likedPosts.includes(postId));
  }, [postId]);

  const handleLike = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIsLiked = !isLiked;
    
    // Optimistic update
    setIsLiked(newIsLiked);
    setLikes(prev => newIsLiked ? prev + 1 : Math.max(0, prev - 1));
    
    // Update localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (newIsLiked) {
      likedPosts.push(postId);
    } else {
      const index = likedPosts.indexOf(postId);
      if (index > -1) likedPosts.splice(index, 1);
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

    // Update server
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          postId, 
          action: newIsLiked ? 'like' : 'unlike' 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(!newIsLiked);
      setLikes(prev => newIsLiked ? prev - 1 : prev + 1);
      console.error('Failed to update like:', error);
    }

    setTimeout(() => setIsAnimating(false), 300);
  }, [postId, isLiked, isAnimating]);

  // Size variants
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Style variants
  if (variant === 'minimal') {
    return (
      <button
        onClick={handleLike}
        className={`flex items-center gap-1.5 transition-all duration-200 ${className}`}
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
      >
        <Heart
          className={`${sizeClasses[size]} transition-all duration-300 ${
            isLiked 
              ? 'fill-red text-red scale-110' 
              : 'text-black/40 hover:text-red/70'
          } ${isAnimating ? 'animate-pulse scale-125' : ''}`}
        />
        {likes > 0 && (
          <span className={`${textSizes[size]} font-heading text-black/60`}>
            {likes}
          </span>
        )}
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
          isLiked 
            ? 'bg-red/10 text-red' 
            : 'bg-black/5 text-black/50 hover:bg-red/10 hover:text-red/70'
        } ${className}`}
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
      >
        <Heart
          className={`${sizeClasses[size]} transition-all duration-300 ${
            isLiked ? 'fill-red' : ''
          } ${isAnimating ? 'animate-pulse scale-125' : ''}`}
        />
        <span className={`${textSizes[size]} font-heading font-bold`}>
          {likes}
        </span>
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleLike}
      className={`group flex items-center gap-2 px-4 py-2 border-2 transition-all duration-200 ${
        isLiked 
          ? 'bg-red border-red text-white' 
          : 'bg-transparent border-black/20 text-black/60 hover:border-red hover:text-red'
      } ${className}`}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <Heart
        className={`${sizeClasses[size]} transition-all duration-300 ${
          isLiked ? 'fill-white' : 'group-hover:fill-red/20'
        } ${isAnimating ? 'animate-pulse scale-125' : ''}`}
      />
      <span className={`${textSizes[size]} font-heading font-bold uppercase`}>
        {isLiked ? 'Liked' : 'Like'}
      </span>
      {likes > 0 && (
        <span className={`${textSizes[size]} font-heading`}>
          {likes}
        </span>
      )}
    </button>
  );
}

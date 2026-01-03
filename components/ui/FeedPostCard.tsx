'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';

interface FeedPostCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    category: string;
    featuredImage: any;
    description: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'design-work': { bg: 'bg-red-200', text: 'text-red-300' },
  'merch-drops': { bg: 'bg-teal-200', text: 'text-teal-300' },
  'food': { bg: 'bg-goldenrod-200', text: 'text-goldenrod-300' },
  'finds': { bg: 'bg-red-200', text: 'text-red-300' },
  'thoughts': { bg: 'bg-teal-200', text: 'text-teal-300' },
};

const categoryLabels: Record<string, string> = {
  'design-work': 'Design Work',
  'merch-drops': 'Merch Drops',
  'food': 'Food',
  'finds': 'Finds',
  'thoughts': 'Thoughts',
};

export default function FeedPostCard({ post }: FeedPostCardProps) {
  const categoryColor = categoryColors[post.category] || categoryColors['thoughts'];
  const categoryLabel = categoryLabels[post.category] || 'Post';

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(600).height(800).url()
    : null;

  const ctaText = post.ctaText || 'Read More';
  const isExternal = post.ctaLink && post.category === 'finds';

  const CardContent = (
    <motion.div
      className="bg-cream border-2 border-black overflow-hidden hover:shadow-lg transition-shadow"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-[3/4] bg-black">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        <span
          className={`inline-block px-3 py-1 text-xs font-heading font-bold uppercase tracking-wide border-2 border-black ${categoryColor.bg} ${categoryColor.text}`}
        >
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl uppercase text-black line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-black/80 line-clamp-2">
          {post.description}
        </p>

        {/* CTA Button */}
        <div className="pt-2">
          <span className="inline-block px-4 py-2 bg-red-200 text-black border-2 border-black font-heading font-bold uppercase text-xs hover:bg-red-300 transition-colors">
            {ctaText}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isExternal && post.ctaLink) {
    return (
      <a
        href={post.ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link href={`/feed/${post.slug}`} className="block">
      {CardContent}
    </Link>
  );
}


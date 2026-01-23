import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  post: Post;
  variant?: 'light' | 'dark';
}

export default function BlogCard({ post, variant = 'light' }: BlogCardProps) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage as any).width(600).height(400).url()
    : null;

  const isDark = variant === 'dark';

  return (
    <article 
      className={`group border-2 border-black overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isDark 
          ? 'bg-black/50 hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]' 
          : 'bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-teal to-goldenrod" />
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Category badges */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className="px-2 py-1 bg-teal text-black font-heading font-bold uppercase text-[10px] tracking-wider"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 ${isDark ? 'bg-black/30' : 'bg-white'}`}>
          {/* Date */}
          {post.publishedAt && (
            <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-cream/60' : 'text-black/50'}`}>
              <Calendar className="w-3 h-3" />
              <time
                className="font-heading text-[10px] uppercase tracking-wider"
                dateTime={post.publishedAt}
              >
                {formatDate(post.publishedAt)}
              </time>
            </div>
          )}

          {/* Title */}
          <h2 className={`font-heading font-bold uppercase text-lg leading-tight mb-3 line-clamp-2 ${
            isDark ? 'text-cream' : 'text-black'
          }`}>
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className={`font-body text-sm leading-relaxed line-clamp-2 mb-4 ${
              isDark ? 'text-cream/70' : 'text-black/70'
            }`}>
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-black/10">
            {post.author && (
              <span className={`font-heading text-[10px] uppercase tracking-wider ${
                isDark ? 'text-cream/50' : 'text-black/50'
              }`}>
                By {post.author}
              </span>
            )}
            <div className={`flex items-center gap-1 font-heading font-bold uppercase text-xs ${
              isDark 
                ? 'text-teal group-hover:text-goldenrod' 
                : 'text-black group-hover:text-teal'
            } transition-colors`}>
              Read
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

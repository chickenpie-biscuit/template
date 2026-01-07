import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage as any).width(600).height(400).url()
    : '/images/placeholder.jpg';

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-6">
        {post.publishedAt && (
          <time
            className="text-sm text-gray-500"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
        )}

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3 hover:text-primary-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}

        <div className="flex items-center justify-between">
          {post.author && (
            <span className="text-sm text-gray-500">By {post.author}</span>
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}


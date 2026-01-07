import { client } from '@/sanity/lib/client';
import { getFeedPostBySlug } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Import Layout Components
import ArtLayout from '@/components/layouts/ArtLayout';
import CommerceLayout from '@/components/layouts/CommerceLayout';
import BlogLayout from '@/components/layouts/BlogLayout';
import QuoteLayout from '@/components/layouts/QuoteLayout';
import ReviewLayout from '@/components/layouts/ReviewLayout';

interface FeedPostPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: FeedPostPageProps): Promise<Metadata> {
  const post = await client?.fetch(getFeedPostBySlug, { slug: params.slug }).catch(() => null);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Chickenpie`,
    description: post.description,
  };
}

export default async function FeedPostPage({ params }: FeedPostPageProps) {
  const post = await client?.fetch(getFeedPostBySlug, { slug: params.slug }).catch(() => null);

  if (!post) {
    notFound();
  }

  // Determine Layout based on Category or Type
  // Default to BlogLayout for 'design-work', 'food', and unknown categories
  let LayoutComponent = BlogLayout;

  if (post.category === 'art') {
    LayoutComponent = ArtLayout;
  } else if (post.category === 'merch-drops') {
    LayoutComponent = CommerceLayout;
  } else if (post.category === 'thoughts') {
    LayoutComponent = QuoteLayout;
  } else if (post.category === 'finds') {
    LayoutComponent = ReviewLayout;
  }

  return (
    <>
      {/* Global Back Button (Sticky) */}
      <div className="fixed top-24 left-6 z-50 hidden lg:block mix-blend-difference text-white">
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowLeft size={16} />
          </div>
          <span className="font-heading font-bold uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Back
          </span>
        </Link>
      </div>

      {/* Render Specific Layout */}
      <LayoutComponent post={post} />
    </>
  );
}

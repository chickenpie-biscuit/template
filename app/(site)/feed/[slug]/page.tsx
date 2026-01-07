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
import DesignWorkLayout from '@/components/layouts/DesignWorkLayout';
import PromptWeekLayout from '@/components/layouts/PromptWeekLayout';
import ChroniclesLayout from '@/components/layouts/ChroniclesLayout';
import ToolTuesdayLayout from '@/components/layouts/ToolTuesdayLayout';
import SolopreneurLayout from '@/components/layouts/SolopreneurLayout';
import SundaySwingsLayout from '@/components/layouts/SundaySwingsLayout';

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

  // Determine Layout based on Category
  let LayoutComponent = BlogLayout;

  if (post.category === 'design-work') {
    LayoutComponent = DesignWorkLayout;
  } else if (post.category === 'art') {
    LayoutComponent = ArtLayout;
  } else if (post.category === 'merch-drops') {
    LayoutComponent = CommerceLayout;
  } else if (post.category === 'prompt-week') {
    LayoutComponent = PromptWeekLayout;
  } else if (post.category === 'chronicles') {
    LayoutComponent = ChroniclesLayout;
  } else if (post.category === 'tool-tuesday') {
    LayoutComponent = ToolTuesdayLayout;
  } else if (post.category === 'solopreneur') {
    LayoutComponent = SolopreneurLayout;
  } else if (post.category === 'sunday-swings') {
    LayoutComponent = SundaySwingsLayout;
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

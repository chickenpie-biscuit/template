import { client } from '@/sanity/lib/client';
import { getFeedPostBySlug } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

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

  // Handle both feedPost (featuredImage) and regular post (mainImage)
  const image = post.featuredImage || post.mainImage;
  const imageUrl = image
    ? urlFor(image).width(1600).height(1200).url()
    : null;

  const categoryLabels: Record<string, string> = {
    'design-work': 'Design Work',
    'merch-drops': 'Merch Drops',
    'food': 'Food',
    'finds': 'Finds',
    'thoughts': 'Thoughts',
  };

  // Default to 'thoughts' or capitalize if not in map
  const categoryLabel = post.category 
    ? (categoryLabels[post.category] || post.category.toUpperCase())
    : 'THOUGHTS';

  return (
    <article className="min-h-screen bg-cream">
      {/* Back Button (Sticky) */}
      <div className="fixed top-24 left-6 z-40 hidden lg:block mix-blend-difference text-white">
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

      <div className="lg:grid lg:grid-cols-2 min-h-screen">
        {/* Left Column - Sticky Visual */}
        <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-black overflow-hidden group">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={image?.alt || post.title}
                fill
                className="object-cover lg:group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-12 text-center bg-teal">
              <h1 className="text-6xl md:text-8xl font-heading font-bold uppercase text-black leading-none">
                {post.title}
              </h1>
            </div>
          )}
          
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 bg-gradient-to-t from-black/80 to-transparent">
            <Link 
              href={`/?filter=${post.category || 'all'}`}
              className="inline-block px-3 py-1 mb-4 border border-cream/50 text-cream font-heading font-bold uppercase text-[10px] tracking-widest hover:bg-cream hover:text-black transition-colors"
            >
              {categoryLabel}
            </Link>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase text-cream leading-[0.9]">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Right Column - Scrolling Content */}
        <div className="bg-cream min-h-screen flex flex-col">
          <div className="flex-1 p-6 md:p-12 lg:p-20 max-w-2xl mx-auto w-full flex flex-col justify-center">
            
            {post.description && (
              <p className="text-xl md:text-2xl font-body text-black leading-relaxed mb-12 border-l-2 border-black pl-6">
                {post.description}
              </p>
            )}

            {/* Price / CTA for Merch & Finds */}
            {(post.category === 'merch-drops' || post.category === 'finds') && (
              <div className="mb-16 p-8 border-2 border-black bg-white relative hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300">
                <div className="absolute -top-3 left-4 bg-red-200 px-3 py-1 border-2 border-black text-xs font-heading font-bold uppercase">
                  Available Now
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    {post.price && (
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-heading font-bold text-black">
                          ${post.price}
                        </span>
                        {post.originalPrice && (
                          <span className="text-xl font-body text-black/40 line-through">
                            ${post.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                    {post.findPrice && (
                      <div className="text-4xl font-heading font-bold text-black">
                        {post.findPrice}
                      </div>
                    )}
                  </div>

                  {post.ctaLink && (
                    <a
                      href={post.ctaLink}
                      target={post.category === 'finds' ? '_blank' : '_self'}
                      rel={post.category === 'finds' ? 'noopener noreferrer' : ''}
                      className="inline-block px-8 py-4 bg-black text-white font-heading font-bold uppercase text-sm hover:bg-red-500 transition-colors text-center"
                    >
                      {post.ctaText || (post.category === 'merch-drops' ? 'Shop Now' : 'View Item')}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Body Content */}
            {post.body && (
              <div className="prose prose-lg prose-headings:font-heading prose-headings:uppercase prose-headings:font-bold prose-headings:text-black prose-p:font-body prose-p:text-black/80 prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline prose-img:border-2 prose-img:border-black prose-blockquote:border-l-2 prose-blockquote:border-black prose-blockquote:bg-white prose-blockquote:p-6 prose-blockquote:not-italic">
                <PortableText content={post.body} />
              </div>
            )}
          </div>

          {/* Next/Prev Navigation or Footer Area within scroll */}
          <div className="p-12 border-t-2 border-black/10 text-center">
            <p className="font-heading font-bold uppercase text-xs tracking-widest text-black/40 mb-4">
              Share this
            </p>
            {/* Social Share Icons could go here */}
          </div>
        </div>
      </div>
    </article>
  );
}

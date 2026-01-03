import { client } from '@/sanity/lib/client';
import { getFeedPostBySlug } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';

interface FeedPostPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export default async function FeedPostPage({ params }: FeedPostPageProps) {
  const post = await client?.fetch(getFeedPostBySlug, { slug: params.slug }).catch(() => null);

  if (!post) {
    notFound();
  }

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(800).url()
    : null;

  const categoryLabels: Record<string, string> = {
    'design-work': 'Design Work',
    'merch-drops': 'Merch Drops',
    'food': 'Food',
    'finds': 'Finds',
    'thoughts': 'Thoughts',
  };

  const categoryLabel = categoryLabels[post.category] || 'Post';

  return (
    <article className="min-h-screen bg-cream">
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative w-full h-[60vh] bg-black border-b-2 border-black">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <Container>
        <div className="py-12 max-w-3xl mx-auto">
          {/* Category Badge */}
          <span className="inline-block px-4 py-2 text-sm font-heading font-bold uppercase tracking-wide border-2 border-black bg-red-200 text-red-300 mb-6">
            {categoryLabel}
          </span>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase mb-6 text-black">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-xl font-body text-black/80 mb-8">{post.description}</p>
          )}

          {/* Body Content */}
          {post.body && (
            <div className="prose prose-lg max-w-none font-body text-black/80">
              <PortableText value={post.body} />
            </div>
          )}

          {/* CTA */}
          {post.ctaLink && (
            <div className="mt-12">
              <a
                href={post.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-red-200 text-black border-2 border-black font-heading font-bold uppercase hover:bg-red-300 transition-colors"
              >
                {post.ctaText || 'Check It Out'}
              </a>
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}


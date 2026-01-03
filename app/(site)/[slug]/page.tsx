import { client } from '@/sanity/lib/client';
import { getPageBySlug } from '@/sanity/lib/queries';
import { Page } from '@/types/sanity';
import Container from '@/components/ui/Container';
import PortableText from '@/components/sanity/PortableText';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await (client
    ?.fetch<Page | null>(getPageBySlug, { slug })
    .catch(() => null) ?? Promise.resolve(null));

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo?.metaTitle || `${page.title} | Site Template`,
    description: page.seo?.metaDescription || page.title,
    robots: page.seo?.noIndex ? 'noindex, nofollow' : undefined,
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = await (client
    ?.fetch<Page | null>(getPageBySlug, { slug })
    .catch(() => null) ?? Promise.resolve(null));

  if (!page) {
    notFound();
  }

  return (
    <div className="py-12">
      <Container>
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
          {page.content && <PortableText content={page.content} />}
        </article>
      </Container>
    </div>
  );
}


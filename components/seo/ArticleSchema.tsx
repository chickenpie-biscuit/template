import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.com';

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  imageUrl?: string;
  url: string;
  category?: string;
  keywords?: string[];
}

export default function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author = 'Chickenpie',
  imageUrl,
  url,
  category,
  keywords = [],
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl ? [imageUrl] : [],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Chickenpie',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(category && { articleSection: category }),
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

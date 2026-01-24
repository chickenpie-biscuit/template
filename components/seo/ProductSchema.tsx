import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';

interface ProductSchemaProps {
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  currency?: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder' | 'LimitedAvailability';
  url: string;
  sku?: string;
  brand?: string;
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
  category?: string;
  rating?: {
    value: number;
    count: number;
    bestRating?: number;
    worstRating?: number;
  };
  reviews?: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}

export default function ProductSchema({
  name,
  description,
  imageUrl,
  price,
  currency = 'USD',
  availability,
  url,
  sku,
  brand = 'Chickenpie',
  condition = 'NewCondition',
  category,
  rating,
  reviews = [],
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: imageUrl ? [imageUrl] : [],
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability: `https://schema.org/${availability}`,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
      itemCondition: `https://schema.org/${condition}`,
      seller: {
        '@type': 'Organization',
        name: 'Chickenpie',
      },
    },
    ...(sku && { sku: sku }),
    ...(category && { category: category }),
    ...(rating && rating.count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value.toFixed(1),
        reviewCount: rating.count,
        bestRating: rating.bestRating || 5,
        worstRating: rating.worstRating || 1,
      },
    }),
    ...(reviews.length > 0 && {
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished,
      })),
    }),
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

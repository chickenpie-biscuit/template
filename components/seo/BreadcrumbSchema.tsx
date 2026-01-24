import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Always include Home as the first item if not already there
  const breadcrumbItems = items[0]?.name === 'Home' 
    ? items 
    : [{ name: 'Home', url: SITE_URL }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

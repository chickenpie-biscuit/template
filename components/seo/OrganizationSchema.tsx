import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chickenpie.co';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chickenpie',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: 'A creative universe that functions as both a design studio and lifestyle brand. Design services, merchandise, food content, and original art.',
    sameAs: [
      'https://twitter.com/chickenpie',
      'https://instagram.com/chickenpie',
      // Add other social media URLs
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${SITE_URL}/contact`,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

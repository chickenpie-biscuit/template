import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import CartProvider from '@/components/cart/CartProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ContentProtection from '@/components/providers/ContentProtection';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chickenpie.co'),
  title: {
    default: 'Chickenpie - Spreading love, chickens & art',
    template: '%s | Chickenpie',
  },
  description: 'A creative universe that functions as both a design studio and lifestyle brand. Design services, merchandise, food content, and original art.',
  keywords: ['chickenpie', 'design studio', 'creative', 'art', 'merchandise', 'lifestyle brand'],
  authors: [{ name: 'Chickenpie' }],
  creator: 'Chickenpie',
  publisher: 'Chickenpie',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chickenpie.co',
    siteName: 'Chickenpie',
    title: 'Chickenpie - Spreading love, chickens & art',
    description: 'A creative universe that functions as both a design studio and lifestyle brand. Design services, merchandise, food content, and original art.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chickenpie - Spreading love, chickens & art',
    description: 'A creative universe that functions as both a design studio and lifestyle brand.',
    creator: '@chickenpie',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://chickenpie.co',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content="f6d1b71d28e994403cde143801364e52" />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5BNLQPHW');`}
        </Script>
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-body`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5BNLQPHW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Structured Data - Organization Schema */}
        <OrganizationSchema />
        
        <SmoothScroll>
          <CartProvider>
            <ContentProtection>
              {children}
            </ContentProtection>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}


// ============================================================
// SITE CONFIG — Edit this file to reskin the template.
// All editable content lives here. No code changes needed.
// ============================================================

export const siteConfig = {
  // Brand identity
  name: 'Template',
  tagline: 'Your tagline here',
  description: 'A modern Next.js + Sanity template',
  url: 'https://yourdomain.com',
  email: 'hello@yourdomain.com',

  // Social
  twitter: '@yourhandle',
  instagram: '@yourhandle',

  // Navigation
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // Footer links (label + href pairs)
  footerLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],

  // Theme — edit these to reskin the entire site
  theme: {
    // Primary/background color
    primary: '#000000',
    onPrimary: '#ffffff',

    // Secondary/foreground
    secondary: '#f5f5f5',
    onSecondary: '#000000',

    // Accent color (CTAs, highlights, badges)
    accent: '#6366f1',
    onAccent: '#ffffff',

    // Surface (cards, elevated elements)
    surface: '#ffffff',
    onSurface: '#000000',

    // Text
    textPrimary: '#000000',
    textSecondary: '#666666',

    // Border
    border: '#e5e5e5',

    // Fonts — use any Google Font name
    fontHeading: '"Space Grotesk", sans-serif',
    fontBody: '"Space Mono", monospace',
    fontPixel: '"Press Start 2P", cursive',
  },

  // Fonts to load (add to globals.css @import if custom)
  fonts: [
    'Space Grotesk:wght@400;500;600;700',
    'Space Mono:wght@400;700',
  ],

  // Header announcement bar (null to disable)
  announcement: null,
  // announcement: {
  //   text: '🚀 New template drop — reskin and ship faster.',
  //   href: '/blog/new-template',
  // },

  // Features (for landing page or about section)
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Built on Next.js 14 with App Router and edge-ready architecture.',
    },
    {
      icon: 'Palette',
      title: 'Easy to Reskin',
      description: 'One config file. Swap colors, fonts, and content without touching code.',
    },
    {
      icon: 'Layers',
      title: 'CMS-Ready',
      description: 'Sanity CMS integration with graceful fallback when unconfigured.',
    },
  ],

  // Hero section
  hero: {
    badge: null,          // e.g. 'Now in beta' or null to hide
    title: 'Build something\nworth building.',
    subtitle: 'A Next.js + Sanity template that ships fast and reskins in minutes.',
    cta: { label: 'Get Started', href: '/contact' },
    secondaryCta: { label: 'View on GitHub', href: 'https://github.com' },
  },

  // SEO
  seo: {
    ogImage: '/og-image.png',
    twitterHandle: '@yourhandle',
  },
}

// Type helper — keep in sync with theme
export type SiteTheme = typeof siteConfig.theme
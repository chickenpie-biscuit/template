// ============================================================
// SITE CONFIG — Edit this file to reskin the template.
// All editable content lives here. No code changes needed.
// ============================================================

export const siteConfig = {
  // Brand identity
  name: 'NXT Template',
  tagline: 'Ship faster. Reskin easier.',
  description: 'A production-ready Next.js + Sanity template for modern web projects.',
  url: 'https://template-site.vercel.app',
  email: 'hello@template.dev',

  // Social
  twitter: '@yourhandle',
  github: 'chickenpie-biscuit/template',

  // Navigation
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Studio', href: '/studio' },
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
  announcement: {
    text: 'Template Demo — Customize config/site.ts to reskin.',
    href: '/studio',
  },

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
    {
      icon: 'Layers',
      title: 'Deploy in Minutes',
      description: 'Push to GitHub, connect Vercel, ship. No complex setup required.',
    },
  ],

  // Hero section
  hero: {
    badge: 'Template Demo',
    title: 'Build anything.\nDeploy everywhere.',
    subtitle: 'The last template you\'ll ever need. Reskin in minutes, deploy in seconds.',
    cta: { label: 'Get the Template', href: 'https://github.com/chickenpie-biscuit/template' },
    secondaryCta: { label: 'View on GitHub', href: 'https://github.com/chickenpie-biscuit/template' },
  },

  // SEO
  seo: {
    ogImage: '/og-image.png',
    twitterHandle: '@yourhandle',
  },
}

// Type helper — keep in sync with theme
export type SiteTheme = typeof siteConfig.theme
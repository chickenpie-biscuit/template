/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Use modern formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Minimize image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize packages
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'gsap'],
  },
  
  // Production optimizations
  poweredByHeader: false,
  
  // React strict mode for better debugging
  reactStrictMode: true,
};

module.exports = nextConfig;


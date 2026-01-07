# Image Display Fix Summary

## The Problem
Blog posts and feed posts were not displaying images (both featured images and body content images).

## Root Cause
The GROQ queries were restructuring the image objects by selecting individual fields:
```groq
mainImage {
  asset->{
    _id,
    url
  },
  alt
}
```

This broke the Sanity image object structure that the `urlFor()` helper expects. The `urlFor()` function needs the complete image object with its original structure including the `asset._ref` field.

## The Solution
Simplified all GROQ queries to select the entire image field as-is, preserving the Sanity image object structure:
```groq
mainImage  // Instead of destructuring the object
```

## Files Modified

### 1. `/sanity/lib/queries.ts`
Updated all queries to preserve image object structure:
- `getAllPosts` - Fixed mainImage selection
- `getPostBySlug` - Fixed mainImage selection  
- `getFeaturedPosts` - Fixed mainImage selection
- `getAllFeedPosts` - Fixed featuredImage and mainImage selection
- `getFeedPostsByCategory` - Fixed featuredImage and mainImage selection
- `getFeedPostBySlug` - Fixed featuredImage selection

### 2. `/components/sanity/PortableText.tsx`
- Simplified image handling to work with standard Sanity image objects
- Changed `object-cover` to `object-contain` to prevent cropping in article bodies
- Added proper width parameter (1200px) for optimized images

### 3. `/components/layouts/ArtLayout.tsx`
- Removed forced dimensions from art images
- Changed from `urlFor(image).width(1600).height(1200).url()` to `urlFor(image).url()`
- This prevents cropping and shows the full artwork at its natural aspect ratio

## How Sanity Images Work

In Sanity, image fields store data like this:
```json
{
  "_type": "image",
  "asset": {
    "_ref": "image-abc123-1920x1080-jpg",
    "_type": "reference"
  },
  "alt": "Description",
  "hotspot": { ... },
  "crop": { ... }
}
```

The `urlFor()` function needs this complete structure, especially the `asset._ref` field, to build the CDN URL.

## Testing
After these changes, you should see:
- ✅ Featured images on blog post cards
- ✅ Featured images on feed post cards  
- ✅ Hero/header images on blog post detail pages
- ✅ Images within article body content (PortableText)
- ✅ Full uncropped art images in gallery view
- ✅ Properly sized images on all feed post types (art, merch, finds, food, design work)

## Additional Notes
- The Next.js image optimization is configured correctly (cdn.sanity.io is whitelisted)
- All image transformations (resize, crop, quality) are now handled by Sanity's image CDN
- The `urlFor()` helper adds proper transformations based on component needs


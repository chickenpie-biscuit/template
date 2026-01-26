import { groq } from 'next-sanity';

export const getAllPages = groq`*[_type == "page"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt
}`;

export const getPageBySlug = groq`*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  content,
  seo,
  publishedAt
}`;

export const getAllPosts = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  author,
  mainImage,
  excerpt,
  publishedAt,
  featured,
  "categories": categories[]-> {
    _id,
    title,
    "slug": slug.current
  }
}`;

export const getPostBySlug = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  author,
  mainImage,
  excerpt,
  body,
  publishedAt,
  featured,
  "categories": categories[]-> {
    _id,
    title,
    "slug": slug.current,
    description
  }
}`;

export const getFeaturedPosts = groq`*[_type == "post" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  author,
  mainImage,
  excerpt,
  publishedAt,
  "categories": categories[]-> {
    _id,
    title,
    "slug": slug.current
  }
}`;

export const getAllProducts = groq`*[_type == "product" || (_type == "feedPost" && category == "merch-drops")] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  price,
  "images": coalesce(images, [featuredImage]),
  "shortDescription": coalesce(shortDescription, description),
  publishedAt,
  featured,
  stock,
  sku,
  productType,
  "category": category-> {
    _id,
    title,
    "slug": slug.current
  }
}`;

export const getProductBySlug = groq`*[(_type == "product" && slug.current == $slug) || (_type == "feedPost" && category == "merch-drops" && slug.current == $slug)][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  price,
  "images": coalesce(images, productGallery, [featuredImage]),
  "description": coalesce(description, body),
  "shortDescription": coalesce(shortDescription, description),
  publishedAt,
  featured,
  stock,
  sku,
  productType,
  downloadUrl,
  sizes,
  originalPrice,
  limitedQuantity,
  dropDate,
  seo,
  reviews,
  averageRating,
  reviewCount,
  "category": category-> {
    _id,
    title,
    "slug": slug.current,
    description
  }
}`;

export const getFeaturedProducts = groq`*[_type == "product" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  images,
  shortDescription,
  publishedAt,
  stock,
  sku,
  productType,
  "category": category-> {
    _id,
    title,
    "slug": slug.current
  }
}`;

export const getProductsByCategory = groq`*[_type == "product" && category._ref == $categoryId] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  images,
  shortDescription,
  publishedAt,
  featured,
  stock,
  sku,
  productType,
  "category": category-> {
    _id,
    title,
    "slug": slug.current
  }
}`;

export const getAllCategories = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  image
}`;

export const getActiveBanners = groq`*[_type == "adBanner" && active == true] | order(displayOrder asc) {
  _id,
  title,
  image,
  link,
  placement,
  displayOrder,
  startDate,
  endDate,
  active
}`;

// Shop Banner Queries - Separate from feed ad banners (5:1 ratio, 1400x280px)
export const getActiveShopBanners = groq`*[_type == "shopBanner" && active == true] | order(displayOrder asc) {
  _id,
  title,
  image,
  link,
  displayOrder,
  startDate,
  endDate,
  active
}`;

// Feed Post Queries - Includes both feedPost and regular blog posts
export const getAllFeedPosts = groq`*[_type == "feedPost" || _type == "post"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "featuredVideo": featuredVideo.asset->url,
  videoUrl,
  mediaType,
  mainImage,
  description,
  shortDescription,
  "excerpt": excerpt,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  productType,
  sizes,
  sku,
  stock,
  limitedQuantity,
  dropDate,
  downloadUrl,
  publishedAt,
  featured,
  likes
}`;

export const getAllFeedPostsAsc = groq`*[_type == "feedPost" || _type == "post"] | order(publishedAt asc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "featuredVideo": featuredVideo.asset->url,
  videoUrl,
  mediaType,
  mainImage,
  description,
  shortDescription,
  "excerpt": excerpt,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  productType,
  sizes,
  sku,
  stock,
  limitedQuantity,
  dropDate,
  downloadUrl,
  publishedAt,
  featured,
  likes
}`;

export const getFeedPostsByCategory = groq`*[(_type == "feedPost" && category == $category) || (_type == "post" && $category == "blog")] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "featuredVideo": featuredVideo.asset->url,
  videoUrl,
  mediaType,
  mainImage,
  description,
  shortDescription,
  "excerpt": excerpt,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  productType,
  sizes,
  sku,
  stock,
  limitedQuantity,
  dropDate,
  downloadUrl,
  publishedAt,
  featured,
  likes
}`;

export const getFeedPostsByCategoryAsc = groq`*[(_type == "feedPost" && category == $category) || (_type == "post" && $category == "blog")] | order(publishedAt asc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "featuredVideo": featuredVideo.asset->url,
  videoUrl,
  mediaType,
  mainImage,
  description,
  shortDescription,
  "excerpt": excerpt,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  productType,
  sizes,
  sku,
  stock,
  limitedQuantity,
  dropDate,
  downloadUrl,
  publishedAt,
  featured,
  likes
}`;

export const getFeedPostBySlug = groq`*[_type == "feedPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "featuredVideo": featuredVideo.asset->url,
  videoUrl,
  mediaType,
  description,
  shortDescription,
  body,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  publishedAt,
  featured,
  seo,
  // Design Work specific fields
  client,
  projectYear,
  services,
  projectChallenge,
  projectSolution,
  projectResults,
  projectGallery,
  // Merch Drops specific fields (synced with Product schema)
  dropDate,
  limitedQuantity,
  productType,
  productGallery,
  sizes,
  sku,
  stock,
  downloadUrl,
  // Prompt of the Week fields
  promptText,
  promptResult,
  aiTool,
  // Tool Tuesday fields
  toolName,
  toolWebsite,
  toolRating,
  toolPrice,
  toolPros,
  toolCons,
  // Solopreneur Sundays fields
  weekNumber,
  revenue,
  metrics,
  wins,
  losses,
  // Chicken Chronicles fields
  characterName,
  episodeNumber,
  storyIllustration,
  // Nom Nom specific fields
  recipeGallery,
  recipeVideo,
  ingredients,
  prepTime,
  cookTime,
  servings,
  difficulty,
  cuisine,
  // Course Review fields
  courseLocation,
  coursePar,
  courseRating,
  courseDifficulty,
  courseConditions,
  courseMap,
  courseWebsite,
  coursePhone,
  courseGallery
}`;

// Studio Project Queries - Only studioProject type (feedPost design-work stays in feed only)
export const getAllStudioProjects = groq`*[_type == "studioProject"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  description,
  year,
  client,
  tags,
  featured,
  publishedAt
}`;

export const getStudioProjectsByCategory = groq`*[_type == "studioProject" && category == $category] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  description,
  year,
  client,
  tags,
  featured,
  publishedAt
}`;

export const getStudioProjectBySlug = groq`*[_type == "studioProject" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  gallery,
  description,
  projectChallenge,
  projectSolution,
  projectResults,
  caseStudy,
  year,
  client,
  tags,
  featured,
  publishedAt
}`;

export const getFeaturedStudioProjects = groq`*[_type == "studioProject" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  description,
  year,
  client,
  tags,
  publishedAt
}`;


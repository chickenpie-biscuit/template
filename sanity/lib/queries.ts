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

export const getAllProducts = groq`*[_type == "product"] | order(publishedAt desc) {
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

export const getProductBySlug = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  price,
  images,
  description,
  shortDescription,
  publishedAt,
  featured,
  stock,
  sku,
  productType,
  downloadUrl,
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
  endDate
}`;

// Feed Post Queries - Includes both feedPost and regular blog posts
export const getAllFeedPosts = groq`*[_type == "feedPost" || _type == "post"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "mainImage": mainImage,
  description,
  "excerpt": excerpt,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  publishedAt,
  featured
}`;

export const getFeedPostsByCategory = groq`*[(_type == "feedPost" && category == $category) || (_type == "post")] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  "mainImage": mainImage,
  description,
  "excerpt": excerpt,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  publishedAt,
  featured
}`;

export const getFeedPostBySlug = groq`*[_type == "feedPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  featuredImage,
  description,
  body,
  ctaText,
  ctaLink,
  price,
  originalPrice,
  findPrice,
  findHighlight,
  publishedAt,
  featured
}`;

// Studio Project Queries - Includes both studioProject and feedPost with design-work category
export const getAllStudioProjects = groq`*[_type == "studioProject" || (_type == "feedPost" && category == "design-work")] | order(publishedAt desc) {
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


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


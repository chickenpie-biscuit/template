import { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref?: string;
    _type?: 'reference';
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  caption?: string;
}

export interface SanityVideo {
  _type: 'file';
  asset: {
    _ref?: string;
    _type?: 'reference';
    _id?: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
}

export interface VideoEmbed {
  _type: 'videoEmbed';
  url: string;
  caption?: string;
}

export type MediaType = 'image' | 'video' | 'external-video';

export type GalleryItem = SanityImage | SanityVideo;

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: string;
  description?: string;
  image?: SanityImage;
}

export interface Page {
  _id: string;
  _type: 'page';
  title: string;
  slug: string;
  content?: PortableTextBlock[];
  seo?: SEO;
  publishedAt?: string;
}

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: string;
  author?: string;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: PortableTextBlock[];
  categories?: Category[];
  tags?: string[];
  seo?: SEO;
  publishedAt?: string;
  _updatedAt?: string;
  featured?: boolean;
}

export interface Product {
  _id: string;
  _type: 'product' | 'feedPost';
  title: string;
  slug: string;
  price: number;
  images?: SanityImage[];
  productGallery?: GalleryItem[];
  featuredImage?: SanityImage;
  featuredVideo?: SanityVideo;
  videoUrl?: string;
  mediaType?: MediaType;
  description?: PortableTextBlock[];
  shortDescription?: string;
  category?: Category;
  productType?: 'physical' | 'digital' | string;
  downloadUrl?: string;
  sku?: string;
  stock?: number;
  featured?: boolean;
  publishedAt?: string;
  _updatedAt?: string;
  originalPrice?: number;
  sizes?: string[];
  limitedQuantity?: boolean;
  dropDate?: string;
  seo?: SEO;
  reviews?: Array<{
    author: string;
    rating: number;
    title?: string;
    comment: string;
    date: string;
    verified?: boolean;
  }>;
  averageRating?: number;
  reviewCount?: number;
}

export interface AdBanner {
  _id: string;
  _type: 'adBanner';
  title: string;
  image: SanityImage;
  link?: string;
  placement?: 'header' | 'sidebar' | 'footer' | 'inline';
  active?: boolean;
  displayOrder?: number;
  startDate?: string;
  endDate?: string;
}


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
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
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
  publishedAt?: string;
  featured?: boolean;
}

export interface Product {
  _id: string;
  _type: 'product' | 'feedPost';
  title: string;
  slug: string;
  price: number;
  images?: SanityImage[];
  featuredImage?: SanityImage;
  description?: PortableTextBlock[];
  shortDescription?: string;
  category?: Category;
  productType?: 'physical' | 'digital' | string;
  downloadUrl?: string;
  sku?: string;
  stock?: number;
  featured?: boolean;
  publishedAt?: string;
  originalPrice?: number;
  sizes?: string[];
  limitedQuantity?: boolean;
  dropDate?: string;
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


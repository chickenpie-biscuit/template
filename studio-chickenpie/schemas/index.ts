import { postType } from './documents/post';
import page from './documents/page';
import product from './documents/product';
import category from './documents/category';
import adBanner from './documents/adBanner';
import feedPost from './documents/feedPost';
import studioProject from './documents/studioProject';
import contactSubmission from './documents/contactSubmission';
import shopBanner from './documents/shopBanner';
import seo from './objects/seo';
import seoImage from './objects/seoImage';
import review from './objects/review';
import link from './objects/link';

export const schemaTypes = [
  // Start with minimal post schema
  postType,
  // Other documents
  page,
  product,
  category,
  adBanner,
  feedPost,
  studioProject,
  contactSubmission,
  shopBanner,
  // Objects
  seo,
  seoImage,
  review,
  link,
];

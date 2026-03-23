import { postType } from './documents/post';
import page from './documents/page';
import product from './documents/product';
import category from './documents/category';
import adBanner from './documents/adBanner';
import shopBanner from './documents/shopBanner';
import feedPost from './documents/feedPost';
import studioProject from './documents/studioProject';
import contactSubmission from './documents/contactSubmission';
import subscriber from './documents/subscriber';
import seo from './objects/seo';
import link from './objects/link';
import seoImage from './objects/seoImage';
import review from './objects/review';

export const schemaTypes = [
  // Start with minimal post schema
  postType,
  // Other documents
  page,
  product,
  category,
  adBanner,
  shopBanner,
  feedPost,
  studioProject,
  contactSubmission,
  subscriber,
  // Objects
  seo,
  link,
  seoImage,
  review,
];


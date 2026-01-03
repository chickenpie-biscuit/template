import { postType } from './documents/post';
import page from './documents/page';
import product from './documents/product';
import category from './documents/category';
import adBanner from './documents/adBanner';
import feedPost from './documents/feedPost';
import studioProject from './documents/studioProject';
import seo from './objects/seo';
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
  // Objects
  seo,
  link,
];


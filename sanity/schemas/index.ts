import page from './documents/page';
import post from './documents/post';
import product from './documents/product';
import category from './documents/category';
import adBanner from './documents/adBanner';
import feedPost from './documents/feedPost';
import studioProject from './documents/studioProject';
import test from './documents/test';
import seo from './objects/seo';
import link from './objects/link';

// Try to catch any import errors
let schemaTypes;
try {
  schemaTypes = [
    // Test schema first to verify Studio works
    test,
    // Documents
    page,
    post,
    product,
    category,
    adBanner,
    feedPost,
    studioProject,
    // Objects
    seo,
    link,
  ];
  console.log('Schemas loaded successfully:', schemaTypes.length, 'types');
} catch (error) {
  console.error('Error loading schemas:', error);
  // Fallback to minimal schema
  schemaTypes = [test];
}

export { schemaTypes };


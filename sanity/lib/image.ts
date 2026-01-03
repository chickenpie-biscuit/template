import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import { projectId, dataset } from '../env';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create builder with project details (works even if client is null)
const builder = imageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || 'production',
});

export function urlFor(source: SanityImageSource) {
  if (!source) {
    return builder.image('/images/placeholder.jpg');
  }
  return builder.image(source);
}


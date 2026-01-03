import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Log schema types for debugging
if (typeof window === 'undefined') {
  console.log('Schema types count:', schemaTypes.length);
  console.log('Schema type names:', schemaTypes.map((s: any) => s.name || s.title || 'unknown'));
}

export default defineConfig({
  name: 'default',
  title: 'Chickenpie CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0fg6ihzb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/admin',
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
});


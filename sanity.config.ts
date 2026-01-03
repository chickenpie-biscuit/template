import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Chickenpie CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'osFWxKg1q',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/admin',
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
});


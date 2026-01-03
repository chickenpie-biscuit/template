import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Chickenpie CMS',
  projectId: '0fg6ihzb',
  dataset: 'production',
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
});


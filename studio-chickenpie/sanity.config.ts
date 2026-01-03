import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Chickenpie CMS',
  projectId: '0fg6ihzb',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});


import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { syncMerchDropToProduct } from './sanity/actions/syncMerchDropToProduct';

export default defineConfig({
  name: 'default',
  title: 'Chickenpie CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0fg6ihzb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/admin',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      // Add sync action for feedPost documents
      if (context.schemaType === 'feedPost') {
        return [...prev, syncMerchDropToProduct];
      }
      return prev;
    },
  },
});


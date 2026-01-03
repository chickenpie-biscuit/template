import { defineField, defineType } from 'sanity';

// Minimal test schema to verify Studio can load
export default defineType({
  name: 'test',
  title: 'Test',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
});


import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoImage',
  title: 'SEO Optimized Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      description: 'REQUIRED for SEO and accessibility. Describe what\'s in the image.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(125)
          .error('Alt text is required (10-125 characters)')
          .warning('Keep it descriptive but concise'),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption displayed below the image',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Image Title',
      description: 'Optional title attribute for additional SEO context',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'caption',
      media: 'asset',
    },
  },
});

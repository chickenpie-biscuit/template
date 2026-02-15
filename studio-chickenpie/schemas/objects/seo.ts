import { defineField, defineType } from 'sanity';
import { MetaDescriptionInput } from '../components/MetaDescriptionInput';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Search Engine Optimization settings',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default title (recommended 50-60 characters)',
      validation: (Rule) => Rule.max(60).warning('Titles longer than 60 characters may be truncated in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Brief description for search engines (recommended 120-160 characters)',
      rows: 4,
      components: {
        input: MetaDescriptionInput,
      },
      validation: (Rule) =>
        Rule.max(160)
          .warning('Descriptions longer than 160 characters may be truncated')
          .min(120)
          .warning('Descriptions should be at least 120 characters for best results'),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary keyword or phrase for this content',
    }),
    defineField({
      name: 'keywords',
      title: 'Additional Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Additional relevant keywords (3-5 recommended)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Custom image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the canonical URL (advanced - leave empty unless you know what you\'re doing)',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'Prevent search engines from following links on this page',
      initialValue: false,
    }),
  ],
});

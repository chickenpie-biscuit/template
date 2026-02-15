import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'shopBanner',
  title: 'Shop Banner',
  type: 'document',
  description: 'Promotional banners for the shop page (5:1 ratio, 1400x280px recommended)',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal name for this banner (not displayed)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      description: 'Recommended size: 1400x280px (5:1 ratio). This is a wide horizontal banner.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'url',
      description: 'Where the banner links to when clicked',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only active banners will be displayed',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first. Banners rotate if multiple are active.',
      initialValue: 0,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'Banner will only show after this date (optional)',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'Banner will stop showing after this date (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      media: 'image',
    },
    prepare({ title, active, media }) {
      return {
        title,
        subtitle: active ? '✓ Active' : '✗ Inactive',
        media,
      };
    },
  },
});

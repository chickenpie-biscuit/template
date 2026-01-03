import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'feedPost',
  title: 'Feed Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().warning('Slug is required before publishing'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Design Work', value: 'design-work' },
          { title: 'Merch Drops', value: 'merch-drops' },
          { title: 'Food', value: 'food' },
          { title: 'Finds', value: 'finds' },
          { title: 'Thoughts', value: 'thoughts' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().warning('Category is required before publishing'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short description (1-2 sentences)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    // Merch Drops specific fields
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'For Merch Drops - product price',
      hidden: ({ document }) => document?.category !== 'merch-drops',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      description: 'For Merch Drops - crossed out price (optional)',
      hidden: ({ document }) => document?.category !== 'merch-drops',
    }),
    // Finds specific fields
    defineField({
      name: 'findPrice',
      title: 'Price Info',
      type: 'string',
      description: 'For Finds - price display (e.g., "$54.99/month", "Free")',
      hidden: ({ document }) => document?.category !== 'finds',
    }),
    defineField({
      name: 'findHighlight',
      title: 'Highlight Text',
      type: 'string',
      description: 'For Finds - top banner text (e.g., "Starting from just")',
      hidden: ({ document }) => document?.category !== 'finds',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Button text (e.g., "View Project", "Shop Now", "Read More")',
      initialValue: 'Read More',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      description: 'External link for Finds, or leave empty for internal post',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show in featured section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'featuredImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category ? category.replace('-', ' ').toUpperCase() : 'No category',
        media,
      };
    },
  },
});


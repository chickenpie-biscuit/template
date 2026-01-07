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
          { title: 'Art', value: 'art' },
          { title: 'Merch Drops', value: 'merch-drops' },
          { title: 'Food', value: 'food' },
          { title: 'Finds', value: 'finds' },
          { title: 'Thoughts', value: 'thoughts' },
          { title: 'Prompt of the Week', value: 'prompt-week' },
          { title: 'Chicken Chronicles', value: 'chronicles' },
          { title: 'Tool Tuesday', value: 'tool-tuesday' },
          { title: 'Solopreneur Sundays', value: 'solopreneur' },
          { title: 'Sunday Swings', value: 'sunday-swings' },
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
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    // Merch Drops specific fields
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      description: 'For Merch Drops - type of product (will appear in shop filters)',
      options: {
        list: [
          { title: 'T-Shirts', value: 't-shirts' },
          { title: 'Prints', value: 'prints' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Stickers', value: 'stickers' },
          { title: 'Posters', value: 'posters' },
          { title: 'Other', value: 'other' },
        ],
      },
      hidden: ({ document }) => document?.category !== 'merch-drops',
    }),
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
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description: 'For Merch Drops - available quantity',
      initialValue: 0,
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
    // Prompt of the Week specific fields
    defineField({
      name: 'promptText',
      title: 'AI Prompt',
      type: 'text',
      rows: 4,
      description: 'For Prompt of the Week - the actual AI prompt used',
      hidden: ({ document }) => document?.category !== 'prompt-week',
    }),
    defineField({
      name: 'promptResult',
      title: 'Result Image/Output',
      type: 'image',
      options: { hotspot: true },
      description: 'For Prompt of the Week - the AI-generated result',
      hidden: ({ document }) => document?.category !== 'prompt-week',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'aiTool',
      title: 'AI Tool Used',
      type: 'string',
      description: 'For Prompt of the Week - e.g., "Midjourney", "ChatGPT", "DALL-E"',
      hidden: ({ document }) => document?.category !== 'prompt-week',
    }),
    // Tool Tuesday specific fields
    defineField({
      name: 'toolName',
      title: 'Tool Name',
      type: 'string',
      description: 'For Tool Tuesday - name of the tool',
      hidden: ({ document }) => document?.category !== 'tool-tuesday',
    }),
    defineField({
      name: 'toolWebsite',
      title: 'Tool Website/Link',
      type: 'url',
      description: 'For Tool Tuesday - link to tool (can be affiliate)',
      hidden: ({ document }) => document?.category !== 'tool-tuesday',
    }),
    defineField({
      name: 'toolRating',
      title: 'Your Rating',
      type: 'number',
      description: 'For Tool Tuesday - rating out of 5',
      validation: (Rule) => Rule.min(0).max(5),
      hidden: ({ document }) => document?.category !== 'tool-tuesday',
    }),
    defineField({
      name: 'toolPrice',
      title: 'Price',
      type: 'string',
      description: 'For Tool Tuesday - e.g., "Free", "$9/mo", "$99 one-time"',
      hidden: ({ document }) => document?.category !== 'tool-tuesday',
    }),
    defineField({
      name: 'toolPros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For Tool Tuesday - list of benefits',
      hidden: ({ document }) => document?.category !== 'tool-tuesday',
    }),
    defineField({
      name: 'toolCons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For Tool Tuesday - list of drawbacks',
      hidden: ({ document }) => document?.category !== 'tool-tuesday',
    }),
    // Solopreneur Sundays specific fields
    defineField({
      name: 'weekNumber',
      title: 'Week Number',
      type: 'number',
      description: 'For Solopreneur Sundays - week in your journey',
      hidden: ({ document }) => document?.category !== 'solopreneur',
    }),
    defineField({
      name: 'revenue',
      title: 'Revenue This Week',
      type: 'number',
      description: 'For Solopreneur Sundays - $ earned',
      hidden: ({ document }) => document?.category !== 'solopreneur',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Metric Name' },
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'change', type: 'string', title: 'Change (e.g., "+25%")' },
          ],
        },
      ],
      description: 'For Solopreneur Sundays - stats to share',
      hidden: ({ document }) => document?.category !== 'solopreneur',
    }),
    defineField({
      name: 'wins',
      title: 'Wins',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For Solopreneur Sundays - achievements this week',
      hidden: ({ document }) => document?.category !== 'solopreneur',
    }),
    defineField({
      name: 'losses',
      title: 'Losses/Challenges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For Solopreneur Sundays - struggles this week',
      hidden: ({ document }) => document?.category !== 'solopreneur',
    }),
    // Chicken Chronicles specific fields
    defineField({
      name: 'characterName',
      title: 'Character Name',
      type: 'string',
      description: 'For Chicken Chronicles - protagonist of this story',
      hidden: ({ document }) => document?.category !== 'chronicles',
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      description: 'For Chicken Chronicles - episode in series',
      hidden: ({ document }) => document?.category !== 'chronicles',
    }),
    defineField({
      name: 'storyIllustration',
      title: 'Story Illustration',
      type: 'image',
      options: { hotspot: true },
      description: 'For Chicken Chronicles - main illustration',
      hidden: ({ document }) => document?.category !== 'chronicles',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
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
      description: 'External link for Finds/Tools, or leave empty for internal post',
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


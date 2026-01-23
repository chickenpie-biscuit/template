import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      description: 'Crossed out price for discounts (optional)',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
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
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Physical', value: 'physical' },
          { title: 'Digital', value: 'digital' },
          { title: 'T-Shirts', value: 't-shirts' },
          { title: 'Prints', value: 'prints' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Stickers', value: 'stickers' },
          { title: 'Posters', value: 'posters' },
          { title: 'Hoodies', value: 'hoodies' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'physical',
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For apparel - e.g., "S", "M", "L", "XL"',
    }),
    defineField({
      name: 'limitedQuantity',
      title: 'Limited Edition',
      type: 'boolean',
      description: 'Is this a limited edition product?',
      initialValue: false,
    }),
    defineField({
      name: 'dropDate',
      title: 'Drop Date',
      type: 'datetime',
      description: 'When the product goes live (for pre-orders)',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      hidden: ({ document }) => document?.productType !== 'digital',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'syncedFromFeedPost',
      title: 'Synced from Feed Post',
      type: 'reference',
      to: [{ type: 'feedPost' }],
      description: 'Reference to the merch-drop feedPost this was synced from',
      readOnly: true,
    }),
    defineField({
      name: 'reviews',
      title: 'Customer Reviews',
      type: 'array',
      of: [{ type: 'review' }],
      description: 'Customer reviews and ratings',
    }),
    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      description: 'Calculated average rating (auto-updates from reviews)',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      description: 'Total number of reviews (auto-updates)',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'Search engine optimization settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      media: 'images.0',
    },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: price ? `$${price.toFixed(2)}` : 'No price',
        media,
      };
    },
  },
});


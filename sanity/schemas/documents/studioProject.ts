import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'studioProject',
  title: 'Studio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Branding & Identity', value: 'branding' },
          { title: 'Web Design & Development', value: 'web' },
          { title: 'Illustration & Art', value: 'illustration' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
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
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief project description for grid view',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full case study content',
    }),
    defineField({
      name: 'year',
      title: 'Year Completed',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Show in featured section',
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
      category: 'category',
      year: 'year',
      media: 'featuredImage',
    },
    prepare({ title, category, year, media }) {
      return {
        title,
        subtitle: `${category ? category.toUpperCase() : ''} ${year ? `• ${year}` : ''}`,
        media,
      };
    },
  },
});


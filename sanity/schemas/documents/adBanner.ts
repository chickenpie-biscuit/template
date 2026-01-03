import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'adBanner',
  title: 'Ad Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'link',
      title: 'Link URL',
      type: 'url',
    }),
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Header', value: 'header' },
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'Footer', value: 'footer' },
          { title: 'Inline', value: 'inline' },
        ],
      },
      initialValue: 'inline',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      placement: 'placement',
      active: 'active',
      media: 'image',
    },
    prepare({ title, placement, active, media }) {
      return {
        title,
        subtitle: `${placement || 'No placement'} - ${active ? 'Active' : 'Inactive'}`,
        media,
      };
    },
  },
});


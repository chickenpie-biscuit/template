import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Header', value: 'header' },
          { title: 'Feed Banner', value: 'feed-banner' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Footer', value: 'footer' },
        ],
      },
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'unsubscribedAt',
      title: 'Unsubscribed At',
      type: 'datetime',
    }),
    defineField({
      name: 'unsubscribeToken',
      title: 'Unsubscribe Token',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'status',
      name: 'name',
    },
    prepare({ title, subtitle, name }) {
      return {
        title: name ? `${name} (${title})` : title,
        subtitle: subtitle,
      };
    },
  },
});

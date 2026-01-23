import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Product Review',
  type: 'object',
  fields: [
    defineField({
      name: 'author',
      title: 'Reviewer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (Rule) => 
        Rule.required()
          .min(1)
          .max(5)
          .precision(1)
          .error('Rating must be between 1 and 5'),
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      description: 'Short headline for the review',
    }),
    defineField({
      name: 'comment',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'verified',
      title: 'Verified Purchase',
      type: 'boolean',
      description: 'Was this a verified purchase?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'rating',
      comment: 'comment',
    },
    prepare({ title, subtitle, comment }) {
      const stars = '★'.repeat(Math.floor(subtitle || 0));
      return {
        title: title || 'Anonymous',
        subtitle: `${stars} ${subtitle}/5 - ${comment?.substring(0, 50) || ''}...`,
      };
    },
  },
});

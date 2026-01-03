import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'Project Inquiry', value: 'project' },
          { title: 'Shop Question', value: 'shop' },
          { title: 'General', value: 'general' },
          { title: 'Press', value: 'press' },
        ],
      },
    }),
    defineField({
      name: 'budgetRange',
      title: 'Budget Range',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      inquiryType: 'inquiryType',
      status: 'status',
    },
    prepare({ title, subtitle, inquiryType, status }) {
      return {
        title: `${title} - ${inquiryType}`,
        subtitle: `${subtitle} | ${status}`,
      };
    },
  },
});


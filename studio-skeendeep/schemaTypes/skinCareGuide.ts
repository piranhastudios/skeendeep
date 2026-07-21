import { defineField, defineType } from 'sanity'

export const skinCareGuideType = defineType({
  name: 'skinCareGuide',
  title: 'Skin Care Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary shown on the guides listing page.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Daily Routine', value: 'Daily Routine' },
          { title: 'Skin Concerns', value: 'Skin Concerns' },
          { title: 'Treatments', value: 'Treatments' },
          { title: 'Expert Advice', value: 'Expert Advice' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})

export const skinCareGuidesPageType = defineType({
  name: 'skinCareGuidesPage',
  title: 'Skin Care Guides Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headerSection',
      title: 'Header Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({ name: 'buttonText', type: 'string', title: 'Button Text' }),
      ],
    }),
  ],
})

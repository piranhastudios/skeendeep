import {defineField, defineType} from 'sanity'

export const testimonialsPageType = defineType({
  name: 'testimonialsPage',
  title: 'Testimonials Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Testimonials',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    // Header Section
    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      type: 'text',
      initialValue: 'Hear from our customers about their experience with NDARA and how our furniture has transformed their spaces.',
    }),
    // Stats
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(3).max(6),
    }),
    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'location',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'rating',
              type: 'number',
              validation: (rule) => rule.required().min(1).max(5),
              initialValue: 5,
            }),
            defineField({
              name: 'text',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'featured',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),
    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      initialValue: 'Join Our Community',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      initialValue: 'Become part of the NDARA family. Share your experience and inspire others to create beautiful living spaces.',
    }),
  ],
})

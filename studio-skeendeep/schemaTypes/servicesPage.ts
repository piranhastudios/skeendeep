import {defineField, defineType} from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Services',
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
      initialValue: 'From initial concept to final installation, we provide comprehensive services to transform your living spaces into extraordinary environments.',
    }),
    // Services
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name: Paintbrush, Ruler, Truck, Wrench',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'features',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.required().min(3).max(6),
            }),
            defineField({
              name: 'image',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    // Process Steps
    defineField({
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
      initialValue: 'Our Process',
    }),
    defineField({
      name: 'processDescription',
      title: 'Process Section Description',
      type: 'text',
      initialValue: 'A seamless journey from inspiration to installation.',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(3).max(6),
    }),
    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      initialValue: 'Ready to Transform Your Space?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      initialValue: 'Schedule a free consultation with our design experts and take the first step towards your dream home.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Book a Consultation',
    }),
  ],
})

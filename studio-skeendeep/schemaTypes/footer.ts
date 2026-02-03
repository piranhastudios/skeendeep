import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Footer Configuration',
      validation: (rule) => rule.required(),
    }),
    // Brand Section
    defineField({
      name: 'brandTagline',
      title: 'Brand Tagline',
      type: 'text',
      initialValue: 'Where interior design expertise meets ecommerce craft. Curated furniture that shapes spaces, not just fills them.',
    }),
    // Footer Links
    defineField({
      name: 'productLinks',
      title: 'Product Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'string', validation: (rule) => rule.required()}),
          ],
        },
      ],
    }),
    defineField({
      name: 'servicesLinks',
      title: 'Services Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'string', validation: (rule) => rule.required()}),
          ],
        },
      ],
    }),
    defineField({
      name: 'aboutLinks',
      title: 'About Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'string', validation: (rule) => rule.required()}),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonialsLinks',
      title: 'Testimonials Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'string', validation: (rule) => rule.required()}),
          ],
        },
      ],
    }),
    // Contact Information
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '+1 (999) 888-77-66',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@ndara.com',
    }),
    defineField({
      name: 'locationAddress',
      title: 'Location Address',
      type: 'text',
      initialValue: 'AE2650, Moscow,\nMametovoy 22-15, Office 4',
    }),
    // Social Media Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
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
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon: Facebook, Instagram, Youtube, Linkedin, Twitter, Github, TikTok, Pinterest',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    // Legal
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2024 — Copyright. All Rights reserved.',
    }),
  ],
})

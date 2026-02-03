import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'storySection',
      title: 'Story Section',
      type: 'object',
      fields: [
        defineField({ name: 'sectionLabel', type: 'string', title: 'Section Label', initialValue: 'Our Story' }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'array', of: [{ type: 'block' }], title: 'Description' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'valuesSection',
      title: 'Values Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({
          name: 'values',
          title: 'Values',
          type: 'array',
          of: [
            defineField({
              name: 'valueItem',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Leaf', value: 'Leaf' },
                      { title: 'Heart', value: 'Heart' },
                      { title: 'Users', value: 'Users' },
                      { title: 'Award', value: 'Award' },
                    ],
                  },
                }),
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({ name: 'description', type: 'text', title: 'Description' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'statsSection',
      title: 'Stats Section',
      type: 'object',
      fields: [
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            defineField({
              name: 'statItem',
              type: 'object',
              fields: [
                defineField({ name: 'value', type: 'string', title: 'Value' }),
                defineField({ name: 'label', type: 'string', title: 'Label' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'teamSection',
      title: 'Team Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description' }),
        defineField({
          name: 'teamMembers',
          title: 'Team Members',
          type: 'array',
          of: [
            defineField({
              name: 'teamMember',
              type: 'object',
              fields: [
                defineField({ name: 'name', type: 'string', title: 'Name' }),
                defineField({ name: 'role', type: 'string', title: 'Role' }),
                defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'sustainabilitySection',
      title: 'Sustainability Section',
      type: 'object',
      fields: [
        defineField({ name: 'sectionLabel', type: 'string', title: 'Section Label', initialValue: 'Sustainability' }),
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({ name: 'description', type: 'array', of: [{ type: 'block' }], title: 'Description' }),
        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
        defineField({ name: 'stat1Value', type: 'string', title: 'Stat 1 Value' }),
        defineField({ name: 'stat1Label', type: 'string', title: 'Stat 1 Label' }),
        defineField({ name: 'stat2Value', type: 'string', title: 'Stat 2 Value' }),
        defineField({ name: 'stat2Label', type: 'string', title: 'Stat 2 Label' }),
      ],
    }),
  ],
})

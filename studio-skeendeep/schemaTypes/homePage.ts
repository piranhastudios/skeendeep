import {defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
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
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'SHAPING SPACES,\nNOT FILLING THEM',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'NDARA brings together interior design thinking and ecommerce craft to create a considered way of furnishing a home.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
    }),
    // Mission Statement
    defineField({
      name: 'missionLabel',
      title: 'Mission Section Label',
      type: 'string',
      initialValue: 'The NDARA Approach',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      initialValue: 'WE CARE ABOUT PROPORTION, TEXTURE, AND RESTRAINT. ABOUT FURNITURE THAT SUPPORTS HOW YOU LIVE RATHER THAN COMPETING FOR ATTENTION.',
    }),
    // Customize Section
    defineField({
      name: 'customizeHeading',
      title: 'Customize Section Heading',
      type: 'string',
      initialValue: 'CURATED FOR\nHOW YOU LIVE',
    }),
    defineField({
      name: 'customizeDescription',
      title: 'Customize Section Description',
      type: 'text',
      initialValue: 'We believe in curation over trends. Our collection brings together pieces that honor materiality and proportion, making intentional choices easier in a world full of options.',
    }),
    defineField({
      name: 'customizeImage',
      title: 'Customize Section Image',
      type: 'image',
    }),
    // Sustainability Section
    defineField({
      name: 'sustainabilityHeading',
      title: 'Sustainability Section Heading',
      type: 'string',
      initialValue: 'MATERIAL\nINTEGRITY\nMATTERS.',
    }),
    defineField({
      name: 'sustainabilityDescription',
      title: 'Sustainability Section Description',
      type: 'text',
      initialValue: 'Our commitment to texture and restraint starts with the materials we choose. Every piece begins with responsibly sourced wood from certified sustainable forests.',
    }),
    defineField({
      name: 'sustainabilityImage',
      title: 'Sustainability Section Image',
      type: 'image',
    }),
  ],
})
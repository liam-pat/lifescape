import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Define the life collection.
const lifeCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

// Define the reading collection.
const readingCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reading' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    book: z.object({
      title: z.string(),
      author: z.string(),
      rating: z.number().min(1).max(5).optional(),
    }),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
  }),
});

// Export all collections.
export const collections = {
  'life': lifeCollection,
  'reading': readingCollection,
};

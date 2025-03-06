import { defineCollection, z } from 'astro:content';

// 定義生活分享的集合架構
const lifeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

// 定義讀書筆記的集合架構
const readingCollection = defineCollection({
  type: 'content',
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

// 導出集合配置
export const collections = {
  'life': lifeCollection,
  'reading': readingCollection,
}; 
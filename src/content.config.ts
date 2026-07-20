import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    publishedDate: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { posts };

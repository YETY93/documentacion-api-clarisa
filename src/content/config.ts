import { z, defineCollection } from 'astro:content';
import { HTTP_METHODS } from '../constants';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    method: z.enum(HTTP_METHODS).optional(),
    endpoint: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};
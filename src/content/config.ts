import { defineCollection, z } from 'astro:content';

const entries = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo_key: z.enum(['wordpress', 'woocommerce', 'telegram', 'pos', 'claude', 'solana', 'x402']),
    one_liner: z.string(),
    long_description: z.string(),
    surface: z.array(z.string()).min(1),
    audience: z.array(z.string()).min(1),
    type: z.array(z.string()).min(1),
    status: z.enum(['Live', 'Beta', 'Experiment']),
    built_by: z.enum(['AllScale', 'Community', 'Partner']),
    primary: z.object({
      label: z.string(),
      url: z.string(),
      modal: z.enum(['pos']).optional(),
    }),
    secondary: z
      .object({
        label: z.string(),
        url: z.string(),
      })
      .nullable()
      .optional(),
    featured: z.boolean().default(false),
    sort_order: z.number().default(100),
    launch_date: z.string(),
  }),
});

export const collections = { entries };

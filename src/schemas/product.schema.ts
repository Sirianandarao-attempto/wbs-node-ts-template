import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    categoryId: z.string().min(1),
    imageUrl: z.string().url().optional(),
  }),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().nonnegative().optional(),
  categoryId: z.string().min(1).optional(),
  imageUrl: z.string().url().optional(),
});

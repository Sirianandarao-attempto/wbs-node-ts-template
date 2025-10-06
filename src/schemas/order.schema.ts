import { z } from "zod";

const orderProduct = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1),
});

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    products: z.array(orderProduct).min(1),
  }),
});

export const updateOrderSchema = z.object({
  products: z.array(orderProduct).min(1).optional(),
});

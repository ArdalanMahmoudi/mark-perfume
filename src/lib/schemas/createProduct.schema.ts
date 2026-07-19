import z from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "نام محصول حداقل باید  3 حرف یا کاراکتر باشد")
    .max(100),
  latinName: z.string().optional().or(z.literal("")),
  slug: z.string().min(3).max(100),
  price: z.coerce.number().int().min(0),
  discount: z.coerce.number().min(0).max(100),
  stock: z.coerce.number().int().min(0),
  volume: z.string().optional().or(z.literal("")),
  category: z.string(),
  description: z.string().min(10),
  details: z.string().optional().or(z.literal('')),
});
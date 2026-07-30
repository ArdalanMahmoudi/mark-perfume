import z from "zod";

export const imageSchema = z
  .instanceof(File, { message: "فایلی انتخاب نشده است" })
  .refine((file) => file.size > 0, { message: "فایلی انتخاب نشده است" })
  .refine((file) => file.type.startsWith("image/"), {
    message: "فقط تصویر مجاز هستند",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "حداکثر حجم 5 مگابایت است",
  });

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "نام محصول حداقل باید  3 حرف یا کاراکتر باشد")
    .max(100),
  latinName: z.string().min(3,"نام لاتین نباید کمتر از 3 کاراکتر باشد"),

  price: z.coerce.number().int().min(0, "قیمت را وارد کنید"),
  discount: z.coerce
    .number()
    .min(0, "تخفیف باید بین 0-100 باشد")
    .max(100, "تخفیف باید بین 0-100 باشد"),
  stock: z.coerce.number().int().min(0, "موجودی را وارد کنید"),
  volume: z.coerce.number().optional().or(z.literal(0)),
  categoryId: z.string().min(1, "دسته بندی را انتخاب کنید"),
  description: z
    .string()
    .trim()
    .min(10, "حداقل توضیحات بیشتر از 10 حروف و کاراکتر باشد"),
  details: z.string().optional().or(z.literal("")),
  specification: z
    .array(z.object({ key: z.string().min(0), value: z.string().min(0) }))
    .min(1, "حداقل یک ویژگی وارد کنید"),
  thumbnail: imageSchema,
  gallery: z.array(imageSchema).max(10, "حداکثر 10 تصویر مجاز است"),
});

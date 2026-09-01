import z from "zod";

export const updateImageSchema = z.union([
  z
    .instanceof(File, { message: "فایلی انتخاب نشده است" })
    .refine((file) => file.size > 0, { message: "فایلی انتخاب نشده است" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "فقط تصاویر مجاز هستند",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "حداکثر حجم 5 مگابایت است",
    })

]);

export const userInfoSchema = z
  .object({
    username: z
      .string()
      .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
      .optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    image: updateImageSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "برای تغییر رمز, رمزعبور فعلی را وارد کنید",
      path: ["currentPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "رمز های عبور یکسان نیستند",
      path: ["confirmPassword"],
    },
  );

export type UserInfoFormValues = z.infer<typeof userInfoSchema>;

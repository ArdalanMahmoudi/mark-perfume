import { z } from "zod";
export const registerSchema = z
  .object({
    username: z.string().optional().or(z.literal("")),
    email: z.string().email("ایمیل معتبر نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز های عبور یکسان نیستند",
    path: ["confirmPassword"],
  });

  export type RegisterFormData = z.infer<typeof registerSchema>
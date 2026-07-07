import z from "zod";

export const loginSchema = z.object({
    email:z.string().email("فرمت ایمیل معتبر نمیباشد"),
    password:z.string().min(6,"رمز عبور باید حداقل 6 کاراکتر باشد")
})

export type LoginFormData = z.infer<typeof loginSchema>
import z, { number } from "zod";

export const commentSchema = z.object({
    body:z.string().min(3,"حداقل 3 حرف یا کاراکتر تایپ کنید"),
    score:z.number({
        error
        :"لطفا امتیاز محصول را وارد کنید",
    }).min(1, "مقدار امتیاز حداقل 1 میباشد").max(5),
    productId:z.string()
})

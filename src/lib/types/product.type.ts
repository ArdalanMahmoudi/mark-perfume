import type{ Prisma } from "@/src/generated/prisma/client";

export type ProductType = Prisma.ProductGetPayload<{
 include:{
    category:true,
    gallery:true,
    comments:true
 }
}>;

export type ProductWithScoreType = Omit<ProductType,"comments"> & {
   avgScore:number,
   reviewCount:number
}
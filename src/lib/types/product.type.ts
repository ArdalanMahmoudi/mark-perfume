import type{ Prisma } from "@/src/generated/prisma/client";

export type ProductType = Prisma.ProductGetPayload<{
 include:{
    category:true,
    gallery:true,
    comments:true
 }
}>;
export type ProductColumnsType = Prisma.ProductGetPayload<{
 select:{
   thumbnail:true,
   name:true,
   price:true,
   stock:true,
   volume:true,
   slug:true
 }
}>;

export type ProductWithScoreType = Omit<ProductType,"comments"> & {
   avgScore:number,
   reviewCount:number
}
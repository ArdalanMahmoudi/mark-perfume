import type{ Prisma } from "@/src/generated/prisma/client";
import z from "zod";
import {  createProductSchema, updateProductSchema } from "../schemas/product.schema";

export type ProductType = Prisma.ProductGetPayload<{
 include:{
    category:true,
    gallery:true,
    comments:true
 }
}>;
export type ProductColumnsType = Prisma.ProductGetPayload<{
 select:{
   id:true,
   thumbnail:true,
   name:true,
   price:true,
   stock:true,
   volume:true,
   slug:true
 }
}>;

export type ProductWithScoreType = Pick<ProductType,"id" | "name" | "slug" | "stock" | "thumbnail" | "price" | "discount" > & {
   avgScore:number,
   reviewCount:number
}

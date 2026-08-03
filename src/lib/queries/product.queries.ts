"use server";
import { prisma } from "../prisma";
import { ProductType } from "../types/product.type";

export async function getProductHomePage(): Promise<ProductType[]> {
  return prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      name: true,
      latinName: true,
      price: true,
      discount: true,
      thumbnail: true,
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany();
}

export async function searchProducts(query) {
  return await prisma.product.findMany({
    where:{
      name:{
        contains:query
      },
      
    },take:10,
    select:{
      id:true,
      name:true,
      slug:true
    }
  })
}

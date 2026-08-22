"use server";
import { prisma } from "../prisma";
import { ProductType, ProductWithScoreType } from "../types/product.type";

export async function getProductWithScore(): Promise<ProductWithScoreType[]> {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      discount: true,
      thumbnail: true,
      stock: true,
      comments: { select: { score:true  },
    },
  }})
  return products.map(({comments, ...product}) => ({
    ...product,
    avgScore:comments.length > 0
    ? comments.reduce((sum, c) => sum + c.score, 0) / comments.length
    : 5,
    reviewCount:comments.length

  }))
}

export async function getCategories() {
  return prisma.category.findMany();
}

export async function searchProducts(query) {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    take: 10,
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
}

export async function getProductUniq(slug) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      gallery: true,
      category: true,
    },
  });
}

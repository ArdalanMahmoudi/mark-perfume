import type { Prisma } from "@/src/generated/prisma/client";

export type ProductType = Prisma.ProductGetPayload<{
  include: {
    category: true;
    gallery: true;
    comments: true;
  };
}>;
export type ProductColumnsType = Prisma.ProductGetPayload<{
  select: {
    id: true;
    thumbnail: true;
    name: true;
    price: true;
    stock: true;
    volume: true;
    slug: true;
  };
}>;

export type ProductWithScoreType = Prisma.ProductGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    price: true;
    discount: true;
    thumbnail: true;
    stock: true;
  };
}> & {
  avgScore?: number;
  reviewCount?: number;
};

export type ProductCardStoreType = Omit<ProductType, "comments" | "gallery"> & {
  qty: number;
};

export type WishCardType = Pick<
  ProductType,
  "id" | "thumbnail" | "name" | "price" | "discount"
> ;

import Header from "@/src/components/layout/Header";
import { prisma } from "@/src/lib/prisma";
import { getCommentId, getComments } from "@/src/lib/queries/comment.queries";
import { getProductUniq } from "@/src/lib/queries/product.queries";
import ProductTemplate from "@/src/templates/product/ProductTemplate";
import React from "react";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const product = await getProductUniq(slug);
  const comments = await prisma.comment.findMany({
    where: { productId: product?.id, status: "ACCEPT" },
  });

  return (
    <>
      <ProductTemplate product={product} comments={comments} />
    </>
  );
};

export default ProductPage;

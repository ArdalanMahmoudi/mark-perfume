import { prisma } from "@/src/lib/prisma";
import ProductDetailTemplate from "@/src/templates/admin/_components/products/ProductDetailTemplate";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      gallery: true,
      category: true,
      comments: {
        where: {
          isAccept: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <>
      <ProductDetailTemplate product={product} />
    </>
  );
};

export default ProductPage;

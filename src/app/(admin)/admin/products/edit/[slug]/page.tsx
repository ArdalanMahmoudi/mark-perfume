import { prisma } from "@/src/lib/prisma";
import { getCategories } from "@/src/lib/queries/product.queries";
import ProductForm from "@/src/templates/admin/_components/products/ProductForm";


const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const categories = await getCategories()
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
      <ProductForm product={product} categories={categories} mode="edit"/>
    </>
  );
};

export default ProductPage;

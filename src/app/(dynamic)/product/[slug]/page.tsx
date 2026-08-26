import { UserProvider } from "@/src/context/user-context";
import { getCommentsMore } from "@/src/lib/queries/comment.queries";
import { getProductUniq } from "@/src/lib/queries/product.queries";
import { getCurrentUser } from "@/src/lib/queries/user.queries";
import ProductTemplate from "@/src/templates/product/ProductTemplate";
import { notFound } from "next/navigation";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const product = await getProductUniq(slug);
  if (!product) {
    return notFound();
  }
  const user = await getCurrentUser();
  const { comments, nextCursor } = await getCommentsMore(product.id);

  return (
    <UserProvider user={user}>
      <ProductTemplate
        product={product}
        initialComments={comments}
        initialCursor={nextCursor}
      />
    </UserProvider>
  );
};

export default ProductPage;
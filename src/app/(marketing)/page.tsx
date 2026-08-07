import {
  getCategories,
  getProductHomePage,
} from "@/src/lib/queries/product.queries";
import HomeTemplate from "@/src/templates/home/HomeTemplate";

async function IndexPage() {
  const products = await getProductHomePage();

  return (
    <>
      <HomeTemplate products={products} />
    </>
  );
}

export default IndexPage;

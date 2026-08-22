

import { getProductWithScore } from "@/src/lib/queries/product.queries";
import HomeTemplate from "@/src/templates/home/HomeTemplate";

async function IndexPage() {
  const products = await getProductWithScore();
  return (
    <>
      <HomeTemplate products={products} />
    </>
  );
}

export default IndexPage;

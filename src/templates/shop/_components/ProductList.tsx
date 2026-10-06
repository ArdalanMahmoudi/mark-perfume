"use client"
import { PaginationDemo } from "@/src/components/common/Pagination";
import ProductCard from "@/src/components/common/ProductCard";
import { usePagination } from "@/src/hooks/usePagination";
import { ProductWithScoreType } from "@/src/lib/types/product.type";
import React from "react";

function ProductList({ products }: { products: ProductWithScoreType[] }) {
  const { showProducts } = usePagination({ products });
  return (
    <>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {showProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="hover:scale-105 transition-all duration-300 ease-in-out"
          />
        ))}
      </div>
      <PaginationDemo products={products} />
    </>
  );
}

export default ProductList;

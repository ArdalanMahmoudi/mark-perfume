"use client"
import { useState } from "react";
import { ProductType, ProductWithScoreType } from "../lib/types/product.type";

export function usePagination({
  products,
}: {
  products: ProductWithScoreType[];
}) {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  const showProducts = products.slice(start, end);
  const totalPage = Math.ceil(products.length / itemsPerPage);
  const nextPage = () => {
    setCurrentPage((prev) => {
      if (prev >= totalPage) {
        return prev;
      }

      return prev + 1;
    });
  };
  const prevPage = () => {
    setCurrentPage((prev) => {
      if (prev <= 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  return {
    prevPage,
    nextPage,
    showProducts,
    currentPage
  };
}

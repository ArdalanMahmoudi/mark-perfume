import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { discountCalculator } from "@/src/lib/helper";
import { ProductType } from "@/src/lib/types/product.type";

const ProductCard = ({
  className,
  product,
}: {
  product: ProductType;
  className?: string;
}) => {
  const totalPrice = product.price && product.discount ? discountCalculator(product.price, product.discount) : null;
  return (
    <Link href={`/product/${product.slug}`} className={`group ${className}`}>
      {/* p-top */}
      <div className="relative h-62.5 border border-grey220 w-full items-end  flex bg-center bg-cover bg-no-repeat rounded-t-[50%] bg-[url('/images/product/product1.png')]"></div>
      {/* p-bottom */}
      <div className="flex flex-col gap-2.5 bg-secondary p-2.5 rounded-b-lg border border-grey220">
        {/* p-name */}
        <p className="text-primary line-clamp-1">{product.name}</p>
        {/* p-desc */}
        <p className="text-gray-500 text-xs flex items-center gap-1 text-justify">
          {product.latinName && product.latinName}
        </p>
        {/* p-price */}
        <div className="flex items-center justify-between mb-3">
          <Button>افزودن به سبد</Button>
          <div className="flex flex-col items-end">
            <p className="text-gray-500 line-through text-xs">
              {Number(product.price).toLocaleString("fa-IR")} تومان
            </p>
            <p className="text-black text-sm">
              {Number(totalPrice).toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

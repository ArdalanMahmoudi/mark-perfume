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
  const totalPrice =
    product.price && product.discount > 0
      ? discountCalculator(product.price, product.discount)
      : product.price;

  return (
    <Link href={`/product/${product.slug}`} className={`group h-full ${className}`}>
      {/* p-top */}
      <Image
        width={500}
        height={500}
        src={product.thumbnail}
        className="relative min-h-60 border border-grey220 w-full items-end  flex bg-center bg-cover bg-no-repeat rounded-t-[50%] "
        alt={product.name}
      />
      {/* p-bottom */}
      <div className="flex flex-col h-32.5 justify-between gap-2.5 bg-secondary p-2.5 rounded-b-lg border border-grey220">
        {/* p-name */}
        <p className="text-primary line-clamp-1">{product.name}</p>
        {/* p-desc */}
        <p className="text-gray-500 text-xs flex items-center gap-1 text-justify line-clamp-1!">
          {product.latinName && product.latinName}
        </p>
        {/* p-price */}
        <div className="flex items-center justify-between mb-3">
          <Button>افزودن به سبد</Button>
          <div className="flex flex-col items-end">
            {/* discount */}
            {product.discount > 0 && (
              <p className="text-gray-500 line-through text-xs">
                {Number(product.price).toLocaleString("fa-IR")} تومان
              </p>
            )}
            {/* price */}
            <p className="text-black text-sm">
              {Number(totalPrice.toFixed(2)).toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

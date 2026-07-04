import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const ProductCard = () => {
  return (
    <Link href={"/"} className="group">
      {/* p-top */}
      <div className="relative h-62.5 border border-grey220 w-full items-end  flex bg-center bg-cover bg-no-repeat rounded-t-[50%] bg-[url('/images/product/product1.png')]"></div>
      {/* p-bottom */}
      <div className="flex flex-col gap-2.5 bg-secondary p-2.5 rounded-b-lg border border-grey220">
        {/* p-name */}
        <p className="text-primary line-clamp-1">
          ادوپرفیوم Amber Glow با ر...
        </p>
        {/* p-desc */}
        <p className="text-gray-500 text-xs flex items-center gap-1 text-justify">
          Amber Glow Eau De Parfum 110ml
        </p>
        {/* p-price */}
        <div className="flex items-center justify-between mb-3">
          <Button>افزودن به سبد</Button>
          <div className="flex flex-col items-end">
            <p className="text-gray-500 line-through text-xs">
              {(5_600_000).toLocaleString("fa-IR")} تومان
            </p>
            <p className="text-black text-sm">
              {(5_000_000).toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

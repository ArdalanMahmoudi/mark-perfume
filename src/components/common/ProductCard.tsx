"use client";
import Image from "next/image";
import Link from "next/link";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { ProductWithScoreType } from "@/src/lib/types/product.type";
import { Star } from "lucide-react";

const ProductCard = ({
  className,
  product,
}: {
  product: ProductWithScoreType;
  className?: string;
}) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group h-full overflow-hidden ${className}`}
    >
      {/* p-top */}
      <div className="relative">
        <Image
          width={500}
          height={500}
          src={product.thumbnail}
          className={`relative min-h-60 border border-grey220 w-full items-end flex bg-center bg-cover bg-no-repeat rounded-t-[50%] ${
            product.stock === 0 ? "opacity-50 grayscale" : ""
          }`}
          alt={product.name}
        />
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 -rotate-12 border-2 border-error500 text-error500 font-bold text-xs px-3 py-1 rounded bg-white/90 select-none">
            ناموجود
          </span>
        )}
      </div>

      {/* p-bottom */}
      <div className="flex flex-col h-32.5 justify-between gap-2.5 bg-secondary p-2.5 py-1 rounded-b-lg border border-grey220">
        {/* p-name */}
        <div className="text-primary line-clamp-2">{product.name}</div>

        {/* p-price & stock */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex flex-col gap-1">
            {/* Avg-Score */}
            <div className="flex items-center gap-0.5 h-5">
              {product?.avgScore ? (
                <>
                  <Star className="size-3 fill-warning400 stroke-warning400" />
                  <span className="text-sm">
                    {product.avgScore
                      .toLocaleString("fa-IR", { maximumFractionDigits: 1 })
                      .replace("٫", ".")}
                  </span>
                </>
              ) : (
                <span className="invisible">-</span>
              )}
            </div>

            {/* Badge-Discount */}
            {product.stock > 0 && product.discount > 0 && (
              <span className="bg-primary text-xs font-bold text-white px-2 py-0.5 rounded-3xl flex items-center justify-center w-fit">
                {product.discount.toLocaleString("fa-IR")}%
              </span>
            )}
          </div>

          <div className="flex flex-col items-end">
            {product.stock === 0 ? (
              <p className="text-error500 font-bold text-sm">ناموجود</p>
            ) : (
              <>
                {/* total-Price */}
                <p className="text-black">
                  {calculatedDiscountedPrice({
                    price: product.price,
                    discount: product.discount,
                  }).toLocaleString("fa-IR")}{" "}
                  تومان
                </p>

                {/* Price */}
                {product.discount > 0 && (
                  <p className="space-x-1 flex">
                    <span className="text-[12px] line-through text-muted-foreground">
                      {Number(product.price).toLocaleString("fa-IR")}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
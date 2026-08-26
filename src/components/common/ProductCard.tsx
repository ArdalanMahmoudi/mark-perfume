"use client";
import Image from "next/image";
import Link from "next/link";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { ProductWithScoreType } from "@/src/lib/types/product.type";
import { useMemo, useState } from "react";
import { ShoppingBasket, Star } from "lucide-react";
import Button from "./Button";
import { useCartStore } from "@/src/stores/cart-store";
import { useToast } from "@/src/context/toast-context";
import { TooltipProvider } from "../ui/tooltip";
import { TooltipDemo } from "./Tooltip";

const ProductCard = ({
  className,
  product,
  isBtnAddToCart = false,
}: {
  product: ProductWithScoreType;
  className?: string;
  isBtnAddToCart?: boolean;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const toast = useToast();
  const addToCartHandler = (product) => {
    addToCart(product);
    toast.success("محصول به سبد خرید اضافه شد");
  };
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group h-full overflow-hidden ${className}`}
    >
      {/* p-top */}

      <Image
        width={500}
        height={500}
        src={product.thumbnail}
        className="relative min-h-60 border border-grey220 w-full items-end  flex bg-center bg-cover bg-no-repeat rounded-t-[50%] "
        alt={product.name}
      />

      {/* p-bottom */}
      <div className="flex flex-col h-32.5 justify-between gap-2.5 bg-secondary p-2.5 py-1 rounded-b-lg border border-grey220">
        {/* p-name */}
        <div className="text-primary line-clamp-1">{product.name}</div>

        {/* p-price & stock*/}

        <div className="flex items-end justify-between mb-3">
          {/* Product Discount > 0 */}
          {product.discount > 0 ? (
            <>
            
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
              {product?.avgScore && (
                <>
                  <Star className="size-3 fill-warning400 stroke-warning400" />
                  <span className="text-sm">
                    {product.avgScore
                      .toLocaleString("fa-IR", { maximumFractionDigits: 1 })
                      .replace("٫", ".")}
                  </span>
                </>
              )}
            </div>
                <span className="bg-primary text-xs font-bold text-white px-2 py-0.5 rounded-3xl flex items-center justify-center w-fit">
                  {product.discount.toLocaleString("fa-IR")}%
                </span>
              </div>
            </>
          ) : (
            <div className="h-5 invisible"></div>
          )}
          <div className="flex flex-col items-end">
            {/* price */}
            <p className="text-black ">
              {calculatedDiscountedPrice({
                price: product.price,
                discount: product.discount,
              }).toLocaleString("fa-IR")}{" "}
              تومان
            </p>

            {/* discount */}
            {product.discount > 0 && (
              <p className="space-x-1 flex">
                <span className="text-[12px] line-through text-muted-foreground">
                  {Number(product.price).toLocaleString("fa-IR")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

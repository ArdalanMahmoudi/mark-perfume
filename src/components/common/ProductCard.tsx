"use client";
import Image from "next/image";
import Link from "next/link";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { ProductType } from "@/src/lib/types/product.type";
import Button from "./Button";
import { useCart } from "@/src/context/cart-context";
import { useToast } from "@/src/context/toast-context";
import { useCartStore } from "@/src/stores/cart-store";

const ProductCard = ({
  className,
  product,
}: {
  product: ProductType;
  className?: string;
}) => {
  // const { addToCart } = useCart();
  const addToCart = useCartStore((state) => state.addToCart) 
  const cart = useCartStore((state) => state.cart)
  const toast = useToast();
  console.log("cart",cart);
  
  
  // const addToCartHandler = (product) => {
  //   addToCart(product);
  //   toast.success("محصول به سبد خرید اضافه شد");
  // };
  return (
    <div className={`group h-full overflow-hidden ${className}`}>
      {/* p-top */}
      <Link href={`/product/${product.slug}`}>
        <Image
          width={500}
          height={500}
          src={product.thumbnail}
          className="relative min-h-60 border border-grey220 w-full items-end  flex bg-center bg-cover bg-no-repeat rounded-t-[50%] "
          alt={product.name}
        />
      </Link>
      {/* p-bottom */}
      <div className="flex flex-col h-32.5 justify-between gap-2.5 bg-secondary p-2.5 rounded-b-lg border border-grey220">
        {/* p-name */}
        <Link
          href={`/product/${product.slug}`}
          className="text-primary line-clamp-1"
        >
          {product.name}
        </Link>
        {/* p-desc */}
        <p className="text-gray-500 text-xs flex items-center gap-1 text-justify line-clamp-1!">
          {product.latinName && product.latinName}
        </p>
        {/* p-price */}
        <div className="flex items-end justify-between mb-3">
          <Button
            className="rounded-sm! cursor-pointer px-6!"
            onClick={() => addToCart(product)}
          >
            افزودن به سبد
          </Button>
          <div className="flex flex-col items-end">
            {/* discount */}
            {product.discount > 0 && (
              <p className="space-x-1 flex">
                <span className="text-sm line-through text-muted-foreground">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </span>
                <span className="bg-primary text-[10px] text-white px-2 py-0.5 rounded-3xl flex items-center justify-center w-fit">
                  {product.discount.toLocaleString("fa-IR")}%
                </span>
              </p>
            )}
            {/* price */}
            <p className="text-black ">
              {calculatedDiscountedPrice({
                price: product.price,
                discount: product.discount,
              }).toLocaleString("fa-IR")}{" "}
              تومان
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

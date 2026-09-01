"use client";
import { calculatedDiscountedPrice } from "@/src/lib/helper";

type MobileAddToCartBarProps = {
  price: number;
  discount: number;
  stock: number;
  onAddToCart: () => void;
};

const MobileAddToCartBar = ({
  price,
  discount,
  stock,
  onAddToCart,
}: MobileAddToCartBarProps) => {
  const finalPrice = calculatedDiscountedPrice({ price, discount });

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 w-full bg-white z-30 border-t border-grey220 px-3 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          {discount > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground line-through whitespace-nowrap">
                {Number(price).toLocaleString("fa-IR")} تومان
              </span>
              <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                {Number(discount).toLocaleString("fa-IR")}%
              </span>
            </div>
          )}
          <span className="text-base font-bold text-black whitespace-nowrap">
            {Number(finalPrice).toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <button
          onClick={onAddToCart}
          disabled={stock === 0}
          className="bg-primary text-white text-sm font-bold px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white hover:text-primary border border-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-white whitespace-nowrap shrink-0"
        >
          {stock === 0 ? "ناموجود" : "افزودن به سبد خرید"}
        </button>
      </div>
    </div>
  );
};

export default MobileAddToCartBar;
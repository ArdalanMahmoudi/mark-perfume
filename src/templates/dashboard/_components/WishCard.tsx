"use client";
import { useToast } from "@/src/context/toast-context";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { useWishlistStore } from "@/src/stores/wishlist-store";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

const WishCard = ({ product }) => {
  const removeFromWishList = useWishlistStore((state) => state.removeFromWishList)
  const toast = useToast();
  
  const removeWishCardHandler = (productId) => {
    Swal.fire({
      title: "حذف از لیست",
      text: "آیا از حذف این محصول از لیست علاقمندی‌ها اطمینان دارید؟",
      showCancelButton: true,
      reverseButtons:true,
      cancelButtonText: "انصراف",
      confirmButtonText: "حذف محصول",
      customClass: {
        cancelButton: "bg-white! border! border-primary! text-primary!",
        confirmButton: "bg-primary! text-white!",
      },
    }).then((res) => {
      if (res.isConfirmed) {
        removeFromWishList(productId);

        toast.success("محصول با موفقیت از لیست علاقه مندی حذف شد");
      }
    });
  };
  return (
    <div className="group h-full overflow-hidden hover:scale-105 duration-300 ease-in-out">
      {/* p-top */}
      <div
        className="relative min-h-60  w-full items-end  flex bg-center bg-cover bg-no-repeat rounded-t-[50%]"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
      >
        <button
          onClick={() => removeWishCardHandler(product.id)}
          className="p-2.5 bg-white border border-grey220 absolute right-1 bottom-1 rounded-full cursor-pointer hover:text-error500 duration-300"
        >
          <Trash size={18} />
        </button>
      </div>
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
    </div>
  );
};

export default WishCard;

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
      <div className="flex flex-col h-32.5 justify-between gap-2.5 bg-secondary p-2.5 rounded-b-lg border border-grey220">
        {/* p-name */}
        <p className="text-primary line-clamp-1">{product.name}</p>
        
        {/* p-price */}
        <div className="flex items-center justify-end mb-3">
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
              {/* {calculatedDiscountedPrice({
                price: product.price,
                discount: product.discount,
              }).toLocaleString("fa-IR")}{" "}
              تومان */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;

import { useToast } from "@/src/context/toast-context";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { CheckCheck, Plus, Trash, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

const CartItem = ({ product, removeProduct }) => {
  const toast = useToast();
  const removeProductHandler = () => {
    Swal.fire({
      title: "آیا میخواهید محصول را از سبد حذف کنید",
      showCancelButton:true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((res) => {
      if (res.isConfirmed) {
        removeProduct(product.id);
        toast.success("محصول مورد نظر حذف شد")
      }
    });
  };
  return (
    <div className="grid p-5 bg-secondary grid-cols-[140px_auto_50px] border border-grey220 gap-3.5 rounded-md items-center">
      {/* img-item */}
      <Image
        src={product.thumbnail}
        width={500}
        height={500}
        className="w-full max-w-50 m-auto rounded-full"
        alt="product"
      />
      {/* middle-item */}
      <div className="flex flex-col gap-3">
        <p className="text-primary text-start">{product.name}</p>
        <div className="flex items-center gap-1.5 text-sm">
          <CheckCheck className="text-primary size-3.5" />
          موجود در انبار
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Truck className="text-primary size-3.5" />
          آماده ارسال
        </div>
        <div className="flex gap-2.5 items-center">
          <p className="text-xs text-grey100 line-through">
            {(product.price).toLocaleString("fa-IR")} تومان
          </p>
          <p>{calculatedDiscountedPrice({price:product.price, discount:product.discount}).toLocaleString("fa-IR")} تومان</p>
        </div>
      </div>

      {/* =======Left-item====== */}
      <div className="border border-grey220 bg-white h-full flex justify-evenly items-center rounded-3xl flex-col">
        <Plus className="size-4 cursor-pointer" />
        <p>{product.qty}</p>
        <Trash
          onClick={() => removeProductHandler()}
          className="size-4 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CartItem;

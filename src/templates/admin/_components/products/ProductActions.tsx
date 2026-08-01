import { useToast } from "@/src/app/ToastProvider";
import { TooltipDemo } from "@/src/components/common/Tooltip";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { deleteProductAction } from "@/src/lib/actions/product.action";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const ProductActions = ({ productId, slug }) => {
  const toast = useToast();
  const router = useRouter();
  const onDelete = (productId) => {
    if (!productId) return;
    Swal.fire({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const product = await deleteProductAction(productId);
        if (product.success) {
          toast.info("محصول مورد نظر حذف شد");
          router.refresh();
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-center gap-2.5">
      {/* edit */}
      <TooltipProvider >
        <TooltipDemo
          btn={
            <Link href={`/admin/products/edit/${slug}`} className="cursor-pointer text-black w-6 h-6">
              <PencilIcon className="size-4 text-black" />
            </Link>
          }
          textTolltip={"ویرایش"}
        />

        {/* delted */}
        <TooltipDemo
          btn={
            <button
              onClick={() => onDelete(productId)}
              className="cursor-pointer"
            >
              <TrashIcon className="size-4" />
            </button>
          }
          textTolltip={"حذف"}
        />
      </TooltipProvider>
    </div>
  );
};

export default ProductActions;

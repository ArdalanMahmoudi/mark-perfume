"use client";

import { useToast } from "@/src/context/toast-context";
import { TooltipDemo } from "@/src/components/common/Tooltip";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { deleteProductAction } from "@/src/lib/actions/product.action";
import { Loader2, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const ProductActions = ({
  productId,
  slug,
}: {
  productId: string;
  slug: string;
}) => {
  const toast = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async (productId: string) => {
    if (!productId || isDeleting) return;

    const res = await Swal.fire({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
    });

    if (!res.isConfirmed) return;

    setIsDeleting(true);
    try {
      const product = await deleteProductAction(productId);

      if (product.success === true || product.success === "true") {
        toast.success("محصول مورد نظر حذف شد");
        router.refresh();
      } else {
        toast.error(product.message ?? "حذف محصول انجام نشد");
      }
    } catch {
      toast.error("مشکلی در حذف محصول پیش آمد");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2.5">
      <TooltipProvider>
        <TooltipDemo
          btn={
            <Link
              href={`/admin/products/${slug}`}
              className="flex h-6 w-6 cursor-pointer items-center justify-center text-black"
              aria-label="ویرایش محصول"
            >
              <PencilIcon className="size-4" />
            </Link>
          }
          textTolltip="ویرایش"
        />

        <TooltipDemo
          btn={
            <button
              type="button"
              onClick={() => onDelete(productId)}
              disabled={isDeleting}
              className="flex h-6 w-6 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="حذف محصول"
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <TrashIcon className="size-4" />
              )}
            </button>
          }
          textTolltip={isDeleting ? "در حال حذف..." : "حذف"}
        />
      </TooltipProvider>
    </div>
  );
};

export default ProductActions;

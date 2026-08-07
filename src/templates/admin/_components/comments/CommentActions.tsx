import { useToast } from "@/src/context/toast-context";
import { TooltipDemo } from "@/src/components/common/Tooltip";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import {
  acceptCommentAction,
  deleteCommentAction,
  rejectCommentAction,
} from "@/src/lib/actions/comment.action";
import { deleteProductAction } from "@/src/lib/actions/product.action";
import { CommentType } from "@/src/lib/types/comment.type";
import { Check, EyeIcon, PencilIcon, TrashIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const CommentActions = ({ commentId, status }: CommentType) => {
  const toast = useToast();
  const router = useRouter();


  const deleteComment = () => {
    
    Swal.fire({
      title: "از حذف کامنت مطمئنید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      customClass: {
        confirmButton: "bg-success500!",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCommentAction(commentId);
          toast.success("کامنت حذف شد");
          router.refresh();
        } catch {
          toast.error("مشکلی پیش آمد");
        }
      }
    });
  };

  const acceptComment = async () => {
    if (status === "ACCEPT") {
      return toast.info("کامنت مدنظر قبلا تایید شده است");
    }
    Swal.fire({
      title: "از تایید کامنت مطمئنید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      customClass: {
        confirmButton: "bg-success500!",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await acceptCommentAction(commentId);
          toast.success("کامنت تایید شد");
          router.refresh();
        } catch {
          toast.error("مشکلی پیش آمد");
        }
      }
    });
  };
  const rejectComment = async () => {
    if (status === "REJECTED") {
      return toast.info("کامنت مدنظر قبلا رد شده است");
    }
    Swal.fire({
      title: "از رد کامنت مطمئنید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      customClass: {
        confirmButton: "bg-success500!",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await rejectCommentAction(commentId);
          toast.error("کامنت رد شد");
          router.refresh();
        } catch {
          toast.error("مشکلی پیش آمد");
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-center gap-2.5">
      <TooltipProvider>
        <TooltipDemo
          btn={
            <Check
              onClick={acceptComment}
              className="size-5 cursor-pointer text-black"
            />
          }
          textTolltip={"تایید"}
        />
        <TooltipDemo
          btn={
            <X
              onClick={rejectComment}
              className="size-5 text-black cursor-pointer "
            />
          }
          textTolltip={"رد"}
        />

        <TooltipDemo
          btn={
            <TrashIcon
              onClick={deleteComment}
              className="size-4 cursor-pointer text-black"
            />
          }
          textTolltip={"حذف"}
        />
      </TooltipProvider>
    </div>
  );
};

export default CommentActions;

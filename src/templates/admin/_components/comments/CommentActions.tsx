"use client";

import { useToast } from "@/src/context/toast-context";
import { TooltipDemo } from "@/src/components/common/Tooltip";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import {
  acceptCommentAction,
  deleteCommentAction,
  rejectCommentAction,
} from "@/src/lib/actions/comment.action";
import { Check, Loader2, TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import CommentReplyForm from "./CommentReplyForm";
import { CommentColumnsType } from "@/src/lib/types/comment.type";

const CommentActions = ({
  comment,
}: {
  comment: Pick<CommentColumnsType, "id" | "status" | "adminReply" | "body">;
}) => {
  const toast = useToast();
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<
    "accept" | "reject" | "delete" | null
  >(null);

  const runAction = async (
    action: "accept" | "reject" | "delete",
    title: string,
    successMessage: string,
  ) => {
    if (pendingAction) return;

    if (action === "accept" && comment.status === "ACCEPT") {
      toast.info("کامنت مدنظر قبلا تایید شده است");
      return;
    }
    if (action === "reject" && comment.status === "REJECTED") {
      toast.info("کامنت مدنظر قبلا رد شده است");
      return;
    }

    const result = await Swal.fire({
      title,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      customClass: { confirmButton: "bg-success500!" },
    });

    if (!result.isConfirmed) return;

    setPendingAction(action);
    try {
      const response =
        action === "accept"
          ? await acceptCommentAction(comment.id)
          : action === "reject"
            ? await rejectCommentAction(comment.id)
            : await deleteCommentAction(comment.id);

      if (response?.success === false) {
        toast.error("عملیات انجام نشد");
        return;
      }

      toast.success(successMessage);
      router.refresh();
    } catch {
      toast.error("مشکلی پیش آمد");
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2.5">
      <TooltipProvider>
        <TooltipDemo
          btn={
            <button
              type="button"
              disabled={!!pendingAction}
              onClick={() =>
                runAction("accept", "آیا از تایید کامنت مطمئنید؟", "کامنت تایید شد")
              }
              className="disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="تایید"
            >
              {pendingAction === "accept" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Check className="size-5 cursor-pointer" />
              )}
            </button>
          }
          textTolltip="تایید"
        />

        <TooltipDemo
          btn={
            <button
              type="button"
              disabled={!!pendingAction}
              onClick={() =>
                runAction("reject", "از رد کامنت مطمئنید؟", "کامنت رد شد")
              }
              className="disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="رد"
            >
              {pendingAction === "reject" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <X className="size-5 cursor-pointer" />
              )}
            </button>
          }
          textTolltip="رد"
        />

        <TooltipDemo
          btn={
            <button
              type="button"
              disabled={!!pendingAction}
              onClick={() =>
                runAction("delete", "از حذف کامنت مطمئنید؟", "کامنت حذف شد")
              }
              className="disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="حذف"
            >
              {pendingAction === "delete" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <TrashIcon className="size-4 cursor-pointer" />
              )}
            </button>
          }
          textTolltip="حذف"
        />

        <CommentReplyForm comment={comment} />
      </TooltipProvider>
    </div>
  );
};

export default CommentActions;

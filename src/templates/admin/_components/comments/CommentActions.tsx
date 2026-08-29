import { useToast } from "@/src/context/toast-context";
import { TooltipDemo } from "@/src/components/common/Tooltip";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import {
  acceptCommentAction,
  deleteCommentAction,
  rejectCommentAction,
} from "@/src/lib/actions/comment.action";

import { Check, EyeIcon, PencilIcon, TrashIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import CommentReplyForm from "./CommentReplyForm";
import { Button } from "@/src/components/ui/button";
import { CommentColumnsType } from "@/src/lib/types/comment.type";

const CommentActions = ({ comment }: { comment: Pick<CommentColumnsType, "id" | "status" | "adminReply" | "body">}) => {
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
          await deleteCommentAction(comment.id);
          toast.success("کامنت حذف شد");
          router.refresh();
        } catch {
          toast.error("مشکلی پیش آمد");
        }
      }
    });
  };

  const acceptComment = async () => {
    if (comment.status === "ACCEPT") {
      return toast.info("کامنت مدنظر قبلا تایید شده است");
    }
    Swal.fire({
      title: "آیا از تایید کامنت مطمئنید؟",
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
          await acceptCommentAction(comment.id);
          toast.success("کامنت تایید شد");
          router.refresh();
        } catch {
          toast.error("مشکلی پیش آمد");
        }
      }
    });
  };
  const rejectComment = async () => {
    if (comment.status === "REJECTED") {
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
          await rejectCommentAction(comment.id);
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
        
          <CommentReplyForm comment={comment} />
        
      </TooltipProvider>
    </div>
  );
};

export default CommentActions;

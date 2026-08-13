"use client";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/context/toast-context";
import { replyCommentAction } from "@/src/lib/actions/comment.action";
import { CommentType } from "@/src/lib/types/comment.type";
import React, { useState } from "react";

const CommentReplyForm = ({ comment }: { comment: CommentType }) => {
  const [reply, setReply] = useState(comment.adminReply ?? "");
  const toast = useToast();
  
  const handleReplySubmit = async (commentId) => {
    const replyedComment = await replyCommentAction(commentId, reply);
    
    if (!replyedComment.success) {
      return toast.error(replyedComment.error as string);
    }
    return toast.success("پاسخ برای کامنت مد نظر ثبت شد");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {comment.adminReply?.length > 0 ? "مشاهده پاسخ" : "پاسخ"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>پاسخ به کامنت</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
          {comment.body}
        </div>

        <Textarea
          placeholder="پاسخ خود را بنویسید..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleReplySubmit(comment.id)}>
              ارسال پاسخ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentReplyForm;

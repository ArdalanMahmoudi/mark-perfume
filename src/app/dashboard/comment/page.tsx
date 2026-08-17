import { getCommentUserId } from "@/src/lib/queries/comment.queries";
import { getCurrentUser } from "@/src/lib/queries/user.queries";
import DashboardCommentTemplate from "@/src/templates/dashboard/comment/DashboardCommentTemplate";
import { redirect } from "next/navigation";
import React from "react";

const CommentPage = async() => {
    const user = await getCurrentUser()
    if (!user) {
        redirect('/login')
    }
    const comments = await getCommentUserId(user?.id)
  return <DashboardCommentTemplate comments={comments}  />;
};

export default CommentPage;

"use server";
import { commentSchema } from "@/src/lib/schemas/comment.schema";
import { getCurrentUser } from "../queries/user.queries";
import { prisma } from "../prisma";
import { getCommentId } from "../queries/comment.queries";
import { requireAdmin } from "../session";
import { revalidatePath } from "next/cache";

export const submitCommentAction = async (formData:{score:number, body:string, productId:string}) => {
  const user = await getCurrentUser();
  if (!user) {
    return {
      message: "ابتدا وارد حساب کاربری خود شوید",
      success: false,
    };
  }

  const result = commentSchema.safeParse(formData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  const comment = result.data;

  await prisma.comment.create({
    data: {
      ...comment,
      userId: user.id,
    },
  });
  return {
    success: true,
    message: "کامنت شما ثبت شد",
  };
};

export const acceptCommentAction = async (commentId:string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "ACCEPT" },
    });
  } catch {}
};

export const rejectCommentAction = async (commentId:string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "REJECTED" },
    });
  } catch {
    return { success: false };
  }
};

export const deleteCommentAction = async (commentId:string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false };
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });
    return {
      success: true,

    };
  } catch {}
};

export const replyCommentAction = async (commentId:string, replyText:string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false ,error:"کامنت یافت نشد"};
    }
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        adminReply: replyText,
        replyedAt:new Date()
      },
    });
    revalidatePath("/admin/comments")
    return {
      success: true
    };
  } catch (error) {
    return { success: false, error:"خطا در ارسال پاسخ" };
  }
};

"use server";
import { commentSchema } from "@/src/lib/schemas/comment.schema";
import { getCurrentUser } from "../queries/user.queries";
import { prisma } from "../prisma";
import { getCommentId } from "../queries/comment.queries";
import { requireAdmin } from "../session";


export const submitCommentAction = async (formData) => {
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

export const acceptCommentAction = async (commentId) => {
  await requireAdmin()
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data:{status:"ACCEPT"}
    });
  } catch {}
};

export const rejectCommentAction = async (commentId) => {
  await requireAdmin()
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data:{status:"REJECTED"}
    });
  } catch {}
};

export const deleteCommentAction = async (commentId) => {
  await requireAdmin()
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false };
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch {}
};

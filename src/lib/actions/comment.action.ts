"use server";
import { commentSchema } from "@/src/lib/schemas/comment.schema";
import { getCurrentUser } from "../queries/user.queries";
import { prisma } from "../prisma";
import { getCommentId } from "../queries/comment.queries";
import { requireAdmin } from "../session";
import { revalidatePath } from "next/cache";

export const submitCommentAction = async (formData: {
  score: number;
  body: string;
  productId: string;
}) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "ابتدا وارد حساب کاربری خود شوید" };
    }

    const result = commentSchema.safeParse(formData);
    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }
    const comment = result.data;

    const product = await prisma.product.findUnique({
      where: { id: comment.productId },
      select: { id: true, slug: true },
    });
    if (!product) {
      return { success: false, message: "محصول یافت نشد" };
    }

    const existing = await prisma.comment.findFirst({
      where: { productId: comment.productId, userId: user.id },
      select: { id: true },
    });
    if (existing) {
      return { success: false, message: "شما قبلاً برای این محصول نظر ثبت کرده‌اید" };
    }

    await prisma.comment.create({
      data: {
        score: comment.score,
        body: comment.body,
        productId: comment.productId,
        userId: user.id,
        status: "PENDING",
      },
    });

    revalidatePath(`/products/${product.slug}`);
    revalidatePath("/admin/comments");

    return { success: true, message: "کامنت شما ثبت شد و پس از تایید نمایش داده می‌شود" };
  } catch (error) {
    console.error("SUBMIT COMMENT ERROR:", error);
    return { success: false, message: "خطا در ثبت کامنت، مجدد امتحان کنید" };
  }
};

export const acceptCommentAction = async (commentId: string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false, message: "کامنت یافت نشد" };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "ACCEPT" },
    });

    revalidatePath("/admin/comments");
    return { success: true };
  } catch (error) {
    console.error("ACCEPT COMMENT ERROR:", error);
    return { success: false, message: "خطا در تایید کامنت" };
  }
};

export const rejectCommentAction = async (commentId: string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false, message: "کامنت یافت نشد" };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { status: "REJECTED" },
    });

    revalidatePath("/admin/comments");
    return { success: true };
  } catch (error) {
    console.error("REJECT COMMENT ERROR:", error);
    return { success: false, message: "خطا در رد کامنت" };
  }
};

export const deleteCommentAction = async (commentId: string) => {
  await requireAdmin();
  try {
    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false, message: "کامنت یافت نشد" };
    }

    await prisma.comment.delete({ where: { id: commentId } });

    revalidatePath("/admin/comments");
    return { success: true };
  } catch (error) {
    console.error("DELETE COMMENT ERROR:", error);
    return { success: false, message: "خطا در حذف کامنت" };
  }
};

export const replyCommentAction = async (commentId: string, replyText: string) => {
  await requireAdmin();
  try {
    if (!replyText || replyText.trim().length === 0) {
      return { success: false, error: "متن پاسخ نمی‌تواند خالی باشد" };
    }

    const findComment = await getCommentId(commentId);
    if (!findComment) {
      return { success: false, error: "کامنت یافت نشد" };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { adminReply: replyText.trim(), replyedAt: new Date() },
    });

    revalidatePath("/admin/comments");
    return { success: true };
  } catch (error) {
    console.error("REPLY COMMENT ERROR:", error);
    return { success: false, error: "خطا در ارسال پاسخ" };
  }
};
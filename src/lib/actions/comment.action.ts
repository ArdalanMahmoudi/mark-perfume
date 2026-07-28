"use server";
import { commentSchema } from "@/src/lib/schemas/comment.schema";
import { getCurrentUser } from "../queries/user.queries";
import { prisma } from "../prisma";
export default async function submitCommentAction(formData) {
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
}

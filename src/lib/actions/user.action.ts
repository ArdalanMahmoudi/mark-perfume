"use server";

import { Role } from "@/src/generated/prisma/enums";
import { verifySession } from "../session";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../queries/user.queries";
import bcrypt from "bcrypt";
import { deleteFile, uploadFile } from "../upload";

export async function toggleBanUser(userId: string) {
  const session = await verifySession();
  if (!session || session.role !== Role.ADMIN) {
    return { success: false, message: "Unauthorized" };
  }
  if (session.id === userId) {
    return { success: false, message: "نمی‌توانید خودتان را مسدود کنید" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isBanned: true },
    });
    if (!user) {
      return { success: false, message: "کاربر یافت نشد" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isBanned: !user.isBanned },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: user.isBanned ? "کاربر رفع مسدودیت شد" : "کاربر مسدود شد",
    };
  } catch (error) {
    console.error("TOGGLE BAN USER ERROR:", error);
    return { success: false, message: "خطا در انجام عملیات" };
  }
}

export async function updateUserInfo(data: {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  image?: File;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, message: "ابتدا وارد حساب کاربری خود شوید" };
  }

  const username = data.username?.trim();
  if (data.username !== undefined && !username) {
    return { success: false, message: "نام کاربری نامعتبر است" };
  }

  const updateData: { username?: string; password?: string; image?: string } = {};
  let uploadedImageUrl: string | null = null;

  try {
    if (username) {
      const duplicate = await prisma.user.findFirst({
        where: { username, NOT: { id: currentUser.id } },
        select: { id: true },
      });
      if (duplicate) {
        return { success: false, message: "این نام کاربری قبلاً استفاده شده است" };
      }
      updateData.username = username;
    }

    if (data.image) {
      uploadedImageUrl = await uploadFile(data.image, "user");
      updateData.image = uploadedImageUrl;
    }

    if (data.newPassword) {
      if (data.newPassword.length < 8) {
        if (uploadedImageUrl) await deleteFile([uploadedImageUrl]);
        return { success: false, message: "رمز عبور جدید باید حداقل ۸ کاراکتر باشد" };
      }
      if (!data.currentPassword) {
        if (uploadedImageUrl) await deleteFile([uploadedImageUrl]);
        return { success: false, message: "برای تغییر رمز ابتدا رمز فعلی را وارد نمایید" };
      }

      const userWithPassword = await prisma.user.findUnique({
        where: { id: currentUser.id },
        select: { password: true },
      });
      if (!userWithPassword?.password) {
        if (uploadedImageUrl) await deleteFile([uploadedImageUrl]);
        return { success: false, message: "امکان تغییر رمز برای این حساب وجود ندارد" };
      }

      const isValid = await bcrypt.compare(data.currentPassword, userWithPassword.password);
      if (!isValid) {
        if (uploadedImageUrl) await deleteFile([uploadedImageUrl]);
        return { success: false, message: "رمزعبور فعلی اشتباه است" };
      }

      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "تغییری برای ذخیره وجود ندارد" };
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    revalidatePath("/", "layout");
    return { success: true, message: "اطلاعات با موفقیت بروزرسانی شد" };
  } catch (error) {
    console.error("UPDATE USER INFO ERROR:", error);
    if (uploadedImageUrl) await deleteFile([uploadedImageUrl]);
    return { success: false, message: "خطا در بروزرسانی اطلاعات، مجدد امتحان کنید" };
  }
}
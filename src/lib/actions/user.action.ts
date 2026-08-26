"use server";

import { Role } from "@/src/generated/prisma/enums";
import { verifySession } from "../session";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../queries/user.queries";
import bcrypt from "bcrypt";
import { uploadFile } from "../upload";

export async function toggleBanUser(userId) {
  const sesion = await verifySession();
  if (!sesion || sesion.role !== Role.ADMIN) {
    return { error: "Unauthorized" };
  }
  if (sesion.id === userId) {
    return { error: "نمیتوانید خودتان را مسدود کنید" };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isBanned: true },
    });
    if (!user) {
      return { error: "کاربر یافت نشد" };
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
    return { error: "خطا در انجام عملیات" };
  }
}

export async function updateUserInfo(data: {
  username?: string;
  currentPassword: string;
  newPassword: string;
  image?:File
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return { success: false, message: "ابتدا وارد حساب کاربری خود شوید" };
  const updateData: { username?: string; password?: string; image?:string } = {};
  if (data.username) {
    updateData.username = data.username;
  }
  if (data.image) {
    const imageUrl = await uploadFile(data.image,"user")
    updateData.image = imageUrl
  }
  if (data.newPassword) {
    if (!data.currentPassword) {
      return {
        success: false,
        message: "برای تغییر رمز ابتدا رمز فعلی را وارد نمایید",
      };
    }

    const userWithPassword = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { password: true },
    });
    if (!userWithPassword) {
      return { success: false, message: "کاربری یافت نشد" };
    }
    const isValid = await bcrypt.compare(
      data.currentPassword,
      userWithPassword?.password,
    );
    if (!isValid) {
      return { success: false, message: "رمز فعلی اشتباه است" };
    }
    updateData.password = await bcrypt.hash(data.newPassword, 10);
  }
  await prisma.user.update({
    where: { id: currentUser.id },
    data: updateData,
  });
  revalidatePath("/", "layout");
  return { success: true, message: "اطلاعات با موفقیت بروزرسانی شد" };
}

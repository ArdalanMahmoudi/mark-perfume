"use server";

import { Role } from "@/src/generated/prisma/enums";
import { verifySession } from "../session";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function toggleBanUser(userId) {
  const sesion = await verifySession();
  if (!sesion || sesion.role !== Role.ADMIN) {
    return {error:"Unauthorized"}
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

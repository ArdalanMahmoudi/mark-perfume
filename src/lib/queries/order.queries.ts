"use server";
import { prisma } from "../prisma";

export async function getLastOrders(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    select: {
      payment: {
        select: { status: true, refId: true },
      },
      status: true,
      createdAt: true,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrdersPerUser(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: true,
      payment: true,
    },
  });
}

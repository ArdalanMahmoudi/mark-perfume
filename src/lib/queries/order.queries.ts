import { prisma } from "../prisma";

export async function getOrders() {
  return await prisma.order.findMany({
    include: { orderItems: true, payment: true, user: true },
  });
}

export async function getOrdersPerUser(userId) {
  return await prisma.order.findMany({
    where:{userId},
  })

}

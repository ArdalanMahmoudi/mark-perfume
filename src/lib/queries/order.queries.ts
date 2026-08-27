"use server"
import { prisma } from "../prisma";

export async function getLastOrders(userId) {
    return await prisma.order.findMany({
    where:{userId},
    include:{
      orderItems:true,
      payment:true
    },
    take:5,
    orderBy:{
      createdAt:"desc"
    }
  })
}

export async function getOrdersPerUser(userId) {
  return await prisma.order.findMany({
    where:{userId},
    include:{
      orderItems:true,
      payment:true
    }
  })

}

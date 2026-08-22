import { Prisma } from "@/src/generated/prisma/client"

export type OrderType = Prisma.OrderGetPayload<{
    include:{
        orderItems:true,
        user:true,
        payment:true
    }
}>
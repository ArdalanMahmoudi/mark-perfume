import { Prisma } from "@/src/generated/prisma/client";

export type OrderType = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    user: true;
    payment: true;
  };
}>;

export type OrderColumnsType = Prisma.OrderGetPayload<{
  select: {
    payment: {
      select: { status: true ,refId:true};
    };
    status:true
    createdAt: true;
  };
}>;

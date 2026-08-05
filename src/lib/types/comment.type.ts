import { Prisma } from "@/src/generated/prisma/client";

export type CommentType = Prisma.CommentGetPayload<{
  include: {
    product: true;
    user: true
  },
}>;

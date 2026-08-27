import type { Prisma } from "@/src/generated/prisma/client";

export type CommentType = Prisma.CommentGetPayload<{
  include: {
    product: true;
    user: true;
  };
}>;
export type CommentColumnsType = Prisma.CommentGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
    user: {
      select: {
        email: true;
      };
    };
  };
}>;

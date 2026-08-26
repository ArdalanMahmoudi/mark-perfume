"use server"
import { prisma } from "../prisma";

export async function getComments() {
  return await prisma.comment.findMany({
    include: {
      user: true,
    },
  });
}

export async function getCommentId(productId) {
  return await prisma.comment.findMany({
    where: { productId },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCommentUserId(userId) {
  return await prisma.comment.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: {
        select: {
          thumbnail: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

export async function getCommentsMore(productId: string, cursor?: string) {
  const comments = await prisma.comment.findMany({
    where: { productId, status: "ACCEPT" },
    take: 5,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
    orderBy: { createdAt: "desc" },
    include:{
        user:{
            select:{username:true, image:true}
        }
    }
  });
  const nextCursor =
    comments.length === 5 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
}

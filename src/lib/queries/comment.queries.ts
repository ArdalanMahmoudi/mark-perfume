import { prisma } from "../prisma";


export async function getComments() {
    return await prisma.comment.findMany({
        include:{
            user:true,
        }
    })
}

export async function getCommentId(productId) {
    return await prisma.comment.findMany({
        where:{productId},
        orderBy:{
            createdAt:"desc"
        }
    })
}
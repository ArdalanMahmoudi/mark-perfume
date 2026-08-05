import { prisma } from "../prisma";


export async function getComments() {
    return await prisma.comment.findMany({
        include:{
            user:true,
            product:true
        }
    })
}

export async function getCommentId(commentId) {
    return await prisma.comment.findUnique({
        where:{id:commentId}
    })
}
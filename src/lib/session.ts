"use server"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await prisma.session.create({
        data:{userId, expiresAt}
    })
    const cookieStore = await cookies()

    cookieStore.set('session',session.id, {
        httpOnly:true,
        // secure:true,  ---> https
        expires:expiresAt,
        sameSite:"lax",
        path:'/'
    })
    
}
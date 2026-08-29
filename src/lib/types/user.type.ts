import type{ Prisma } from "@/src/generated/prisma/client";

export type UserType = Prisma.UserGetPayload<{
    include:{
        comments:true,
        orders:true
    }
}>

export type UserColumnsType = Prisma.UserGetPayload<{
    select:{
        id:true,
        isBanned:true,
        username:true,
        email:true,
        createdAt:true,
        role:true
    }
}>

export type roles =  "ADMIN" | "USER"
import { Prisma } from "@/src/generated/prisma/client";

export type UserType = Prisma.UserGetPayload<{
    include:{
        comments:true,
        orders:true
    }
}>
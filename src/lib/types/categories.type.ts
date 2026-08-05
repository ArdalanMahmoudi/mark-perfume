import { Prisma } from "@/src/generated/prisma/client";

export type CategoryType = Prisma.CategoryGetPayload<{
select:{
    id:true,
    name:true,
    slug:true
}
}>
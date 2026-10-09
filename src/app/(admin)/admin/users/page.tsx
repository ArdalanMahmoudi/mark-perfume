import { prisma } from "@/src/lib/prisma";
import { DataTable } from "@/src/components/common/data-table";
import { userColumns } from "@/src/templates/admin/_components/user/UserColumns";
import React from "react";
import { getCurrentUser } from "@/src/lib/queries/user.queries";
import { Role } from "@/src/generated/prisma/enums";

const Page = async () => {
  const users = await prisma.user.findMany();
  const currentUser = await getCurrentUser()
  const rows = users.map((u) => ({
    ...u,
    canBan:currentUser?.role === Role.ADMIN && u.role !== Role.ADMIN,
  }))
  return (
    <div className="flex flex-col gap-4 py-2 md:gap-6">
      <h2 className="text-xl">کاربران</h2>
      <div className="container mx-auto py-4">
        <DataTable columns={userColumns} data={rows} />
      </div>
    </div>
  );
};

export default Page;

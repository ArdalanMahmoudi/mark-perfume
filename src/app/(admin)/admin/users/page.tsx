import { prisma } from "@/src/lib/prisma";
import { DataTable } from "@/src/templates/admin/_components/data-table";
import { userColumns } from "@/src/templates/admin/_components/user/UserColumns";
import React from "react";

const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col gap-4 py-2 md:gap-6">
      <h2 className="text-xl">کاربران</h2>
      <div className="container mx-auto py-4">
        <DataTable columns={userColumns} data={users} />
      </div>
    </div>
  );
};

export default Page;

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { columns } from "@/src/templates/admin/_components/tables/products/columns";
import { DataTable } from "@/src/templates/admin/_components/tables/products/data-table";
import { prisma } from "@/src/lib/prisma";

const Page = async () => {
  const data = await prisma.product.findMany();
  return (
    <>
      <h2 className="text-xl">محصولات</h2>
      <div className="flex my-2 gap-4">
        <div className="flex w-full items-center border border-grey220 rounded-sm px-4 h-9">
          <Search className="size-4 text-grey220" />
          <input
            type="text"
            className="flex-1 py-1 text-sm px-4 pr-1 rounded-sm text-black w-full placeholder-gray-400 focus:outline-none "
            placeholder="جستجوی محصولات"
          />
        </div>
        <Link
          href={"/admin/products/new"}
          className="flex items-center gap-1 px-2 py-1 border border-grey220 text-nowrap rounded-sm"
        >
          <span>افزودن محصول</span>
          <Plus className="size-4" />
        </Link>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    
    </>
  );
};

export default Page;

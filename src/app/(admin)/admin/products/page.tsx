import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/src/components/common/data-table";
import { prisma } from "@/src/lib/prisma";
import { productColumns } from "@/src/templates/admin/_components/products/productColumns";

const Page = async () => {
  const data = await prisma.product.findMany();
  return (
    <>
      <div className="flex flex-col gap-4 py-2 md:gap-6">
        <div className="flex justify-between">
          <h2 className="text-xl">محصولات</h2>
          <Link
            href={"/admin/products/new"}
            className="flex text-sm bg-white items-center gap-1 px-2 py-1 border border-grey220 text-nowrap rounded-sm"
          >
            <span>افزودن محصول</span>
            <Plus className="size-4" />
          </Link>
        </div>
        <div className="flex my-2 gap-4">
          <div className="flex w-full items-center border border-grey220 rounded-sm bg-white px-4 h-10">
            <Search className="size-4 text-gray-500" />
            <input
              type="text"
              className="flex-1 py-1 text-sm px-4 pr-1 rounded-sm text-black w-full placeholder-gray-500 focus:outline-none "
              placeholder="جستجوی محصولات"
            />
          </div>
        </div>
        <div className="container mx-auto py-4">
          {data.length > 0 ? (
            <DataTable columns={productColumns} data={data} />
          ) : (
            <div className="flex flex-col items-center gap-2 justify-center">
              <h1 className="text-center text-gray-500 text-lg">
                هنوز محصولی اضافه نکرده اید
              </h1>
                <Link
                  href={"/admin/products/new"}
                  className="flex text-sm items-center gap-1 px-2 py-1  text-nowrap rounded-sm text-gray-400 "
                >
              
                <span> از اولین محصول خود شروع کنید</span>
                  <Plus className="size-4" />
              
                </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

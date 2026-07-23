import { Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <h2 className="text-xl">محصولات</h2>
      <div className="flex my-12 gap-4">
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
    </div>
  );
};

export default Page;

import { prisma } from "@/src/lib/prisma";
import { getCategories } from "@/src/lib/queries/product.queries";
import FormAddProduct from "@/src/templates/admin/_components/FormAddProduct";
import React from "react";

export default async function Page () {
  const categories = await getCategories()
  return (
    <div className="bg-white rounded-lg p-3">
      <h2 className="text-lg font-bold">افزودن محصول</h2>
      <div className="my-12">
        <FormAddProduct categories={categories}/>
      </div>
    </div>
  );
};



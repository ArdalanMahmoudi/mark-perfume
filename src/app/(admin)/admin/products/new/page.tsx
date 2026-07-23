import FormAddProduct from "@/src/templates/admin/_components/FormAddProduct";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white rounded-lg p-3">
      <h2 className="text-lg font-bold">افزودن محصول</h2>
      <div className="my-12">
        <FormAddProduct/>
      </div>
    </div>
  );
};

export default Page;

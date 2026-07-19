"use client";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { createProductAction } from "@/src/lib/actions/product.action";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type ProductForm = {
  name: string;
  slug: string;
  latinName?: string;
  price: number;
  discount: number;
  stock: number;
  volume: string;
  category: string;
  description: string;
  details: string;
  specKey: string;
  specValue: string;
  specification: { key: ""; value: "" }[];
  image: FileList;
  gallery: FileList;
};

const initialState = {
  name: "",
  slug: "",
  latinName: "",
  price: 0,
  discount: 0,
  stock: 0,
  volume: "",
  category: "",
  description: "",
  details: "",
  specKey: "",
  specValue: "",
  specification: [],
};
const ProductsTemplate = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<ProductForm>({ mode: "onChange", defaultValues: initialState });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specification",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section>
      <h2 className="text-lg my-4 text-white text-center">ایجاد محصول جدید</h2>
      <hr className="border border-gray-300" />
      <p className="text-white my-4">
        اطلاعات اصلی<b className="text-red-500">*</b>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 "
      >
        <InputGroupInlineStart
          id="name"
          type="text"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="نام محصول"
          {...register("name")}
        />
        <InputGroupInlineStart
          id="slug"
          type="text"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="اسلاگ"
          {...register("slug")}
        />
        <InputGroupInlineStart
          id="latinName"
          type="text"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="(اختیاری)نام لاتین"
          {...register("latinName")}
        />
        <InputGroupInlineStart
          id="price"
          type="number"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="قیمت"
          {...register("price")}
        />
        <InputGroupInlineStart
          id="discount"
          type="number"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="تخفیف"
          {...register("discount")}
        />
        <InputGroupInlineStart
          id="stock"
          type="number"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="موجودی"
          {...register("stock")}
        />
        <InputGroupInlineStart
          id="volume"
          type="text"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="input"
          label="حجم(میلی لیتر)"
          {...register("volume")}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-gray-300 text-sm">دسته بندی محصول</label>
          <select
            {...register("category")}
            className="text-gray-300 glass rounded-md px-2.5  h-12 w-full flex items-center "
          >
            <option value="-1" selected>
              انتخاب دسته بندی...
            </option>
            <option value="Floral">گُلی (Floral) </option>
            <option value="Oriental/Ambery"> شرقی (Oriental/Ambery) </option>
            <option value="Woody">چوبی (Woody) </option>
            <option value="Fresh">تازه (Fresh) </option>
            <option value="Fougère">سرخسی (Fougère) </option>
          </select>
        </div>

        <InputGroupInlineStart
          id="description"
          type="text"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="textarea"
          label="توضیح کوتاه"
          {...register("description")}
        />
        <InputGroupInlineStart
          id="details"
          type="text"
          classNameField="glass text-white focus-visible:ring-purple-400"
          classNameLabel="text-gray-300"
          element="textarea"
          label="توضیح کامل(اختیاری)"
          {...register("details")}
        />

        {/* --------------------------------- */}
        <div className="flex flex-col col-span-2 my-8 gap-6">
          <p className="text-white text-lg">
            تصاویر<b className="text-red-500">*</b>
          </p>
          <div className="flex gap-4">
            <label className="w-full px-6 py-4 glass" htmlFor="image">
              +عکس اصلی
            </label>
            <label className="w-full px-6 py-4 glass" htmlFor="gallery">
              +گالری تصاویر
            </label>
            <input
              hidden
              id="image"
              type="file"
              {...register("image")}
              accept="image/*"
            />
            <input
              hidden
              id="gallery"
              type="file"
              {...register("gallery")}
              accept="image/*"
              multiple
            />
          </div>
        </div>

        {/* ---------------------------------- */}

        {/* specifications */}
        <div className="flex flex-col col-span-2 items-center ">
          <div className="flex flex-col gap-2 w-full my-4">
            <p className="text-white my-8 mb-4">
              ویژگی های محصول<b className="text-red-500">*</b>
            </p>
            <div className="flex gap-3">
              <InputGroupInlineStart
                element="input"
                label="نام ویژگی"
                classNameField="glass text-white focus-visible:ring-purple-400"
                classNameLabel="text-gray-300"
                {...register(`specKey`)}
              />
              <InputGroupInlineStart
                element="input"
                label="مقدار ویژگی"
                classNameField="glass text-white focus-visible:ring-purple-400"
                classNameLabel="text-gray-300"
                {...register(`specValue`)}
              />
            </div>
          </div>

          <button
            onClick={() => {
              const key = getValues("specKey");
              const value = getValues("specValue");
              append({ key, value });
            }}
            className="bg-purple-500 px-6 py-2 my-8 rounded-lg text-white w-fit cursor-pointer"
          >
            افزودن ویژگی+
          </button>
        </div>
        <table className="text-white  col-span-2">
          <thead>
            <th className="p-2 border border-grey250">#</th>
            <th className="p-2 border border-grey250">نام ویژگی</th>
            <th className="p-2 border border-grey250">مقدار ویژگی</th>
            <th className="p-2 "></th>
          </thead>
          {fields.map((field, idx) => (
            <tr className="my-2">
              <td className="p-1 py-2 text-center">{idx + 1}</td>
              <td className="p-1 py-2 text-center">{field.key}</td>
              <td className="p-1 py-2 text-center">{field.value}</td>
              <td className="p-1 py-2 text-center">
                <Trash className="size-5" />
              </td>
            </tr>
          ))}
        </table>
      </form>
    </section>
  );
};

export default ProductsTemplate;

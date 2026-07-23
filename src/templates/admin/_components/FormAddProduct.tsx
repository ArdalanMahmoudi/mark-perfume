"use client";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { CloudUploadIcon, Plus, TrashIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import ThumbnailUploader from "./ThumbnailUploader";
import GalleryUploader from "./GalleryUploader";
import { createProductAction } from "@/src/lib/actions/product.action";
import { useToast } from "@/src/app/ToastProvider";
import { createProductSchema } from "@/src/lib/schemas/createProduct.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const initialState = {
  name: "",
  latinName: "",
  category: "",
  price: 0,
  discount: 0,
  description: "",
  details: "",
  specification: { key: "", value: "" },
  stock: 0,
  volume: 0,
  slug: "",
  thumbnail: undefined,
  gallery: [],
};

const FormAddProduct = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      latinName: "",
      category: "",
      price: 0,
      discount: 0,
      description: "",
      details: "",
      specification: [{ key: "", value: "" }],
      stock: 0,
      volume: 0,
      slug: "",
      thumbnail: undefined,
      gallery: [],
    },
  });

  // RHF
  const { fields, remove, append } = useFieldArray({
    name: "specification",
    control,
  });

  // Toast
  const toast = useToast();

  // handleform
  const onSubmit = async (data) => {
    const formData = new FormData();
    const fields = Object.keys(data);
    fields.forEach((field) => {
      if (
        field !== "thumbnail" &&
        field !== "gallery" &&
        field !== "specification"
      ) {
        formData.append(field, data[field]);
      }
    });

    formData.append("thumbnail", data.thumbnail);
    data.gallery.forEach((file) => {
      formData.append("gallery", file);
    });

    formData.append("specification", JSON.stringify(data.specification));
    try {
      await createProductAction(initialState, formData);
      toast.success("محصول ایجاد شد");
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      {/* name */}
      <div className="grid grid-cols-2 my-8 gap-4">
        <InputGroupInlineStart
          element="input"
          label="نام محصول"
          {...register("name")}
          classNameLabel="text-base"
          caption={errors.name?.message}
        />
        <InputGroupInlineStart
          element="input"
          label="نام محصول(لاتین)"
          {...register("latinName")}
          classNameLabel="text-base"
        />
      </div>
      {/* prices */}
      <div className="grid my-8 gap-4 grid-cols-4">
        <div className="flex gap-2 flex-col col-span-2">
          <label htmlFor="category">دسته‌بندی</label>
          <select
            {...register("category")}
            className="h-12 p-2 text-sm  rounded-sm border border-grey220 outline-0"
          >
            <option value="-1">انتخاب دسته بندی...</option>
            <option value="Floral">گُلی (Floral)</option>
            <option value="Oriental/Ambery">شرقی (Oriental/Ambery)</option>
            <option value="Woody">چوبی (Woody)</option>
            <option value="Fresh">تازه (Fresh)</option>
            <option value="Fougère">سرخسی (Fougère)</option>
          </select>
          <p className="text-error500">{errors.category?.message}</p>
        </div>
        <InputGroupInlineStart
          element="input"
          label="قیمت"
          {...register("price")}
          classNameLabel="text-base"
          type="number"
          min={0}
          caption={errors.price?.message}
        />
        <InputGroupInlineStart
          element="input"
          label="تخفیف"
          {...register("discount")}
          classNameLabel="text-base"
          type="number"
          min={0}
          max={100}
          caption={errors.discount?.message}
        />
      </div>
      {/* desc */}
      <div className="my-12">
        <InputGroupInlineStart
          element="textarea"
          label="توضیحات(کوتاه)"
          {...register("description")}
          classNameLabel="text-base"
          classNameInput="h-52"
          classNameField="mb-12"
          caption={errors.description?.message}
        />
        <InputGroupInlineStart
          element="textarea"
          label="توضیحات(تکمیلی)"
          {...register("details")}
          classNameLabel="text-base"
          classNameInput="h-52"
          classNameField="mb-12"
          caption={errors.details?.message}
        />
      </div>
      {/* specification */}
      <div className="flex flex-col items-start my-8">
        <div className="flex flex-col gap-x-4 w-full ">
          <div className="flex items-center ">
            <div className="w-1/2 mr-2">ویژگی</div>
            <div className="w-1/2 mr-2">مقدار ویژگی</div>
          </div>
          {fields.map((field, index) => (
            <div className="flex gap-4 items-center">
              <InputGroupInlineStart
                element="input"
                {...register(`specification.${index}.key`)}
                classNameLabel="text-base"
                classNameField=" h-9"
              />
              <InputGroupInlineStart
                element="input"
                {...register(`specification.${index}.value`)}
                classNameLabel="text-base"
                classNameField=" h-9"
              />
              <button className="w-1/6" onClick={() => remove(index)}>
                <TrashIcon className="size-5 hover:text-error500 duration-300 transition-all cursor-pointer" />
              </button>
            </div>
          ))}
          <p className="text-error500 text-sm">{errors.specification?.message}</p>
        </div>
        <button
          type="button"
          onClick={() => append({ key: "", value: "" })}
          className="bg-gray-50 mt-2 w-fit cursor-pointer px-4 py-2 rounded-sm flex items-center border border-grey220"
        >
          <span>افزودن ویژگی</span>
          <Plus className="size-4" />
        </button>
      </div>
      {/*  */}

      <div className="grid grid-cols-3 gap-4 my-8">
        <InputGroupInlineStart
          element="input"
          label="موجودی"
          classNameLabel="text-base"
          {...register("stock")}
          type="number"
          caption={errors.stock?.message}
        />
        <InputGroupInlineStart
          element="input"
          label="حجم"
          {...register("volume")}
          classNameLabel="text-base"
          icon={"ml(میلی لیتر)"}
          type="number"
          min={0}
          caption={errors.volume?.message}
        />
        <InputGroupInlineStart
          element="input"
          label="آدرس URL محصول"
          {...register("slug")}
          classNameLabel="text-base"
          caption={errors.slug ? errors.slug.message : "در آدرس صفحه محصول استفاده میشود. فقط از حروف انگلیسی اعداد و خط تیره (-) استفاده کنید "}
        />
      </div>
      {/* images */}

      <div className="grid grid-cols-2 gap-4 my-12">
        <div className="">
          <span>تصویر اصلی محصول</span>
          <ThumbnailUploader
            name="thumbnail"
            setValue={setValue}
            watch={watch}
          
          />
        </div>
        <div className="">
          <span> گالری تصاویر محصول</span>
          <GalleryUploader name="gallery" setValue={setValue} watch={watch} />
        </div>
      </div>

      <button className="bg-black text-white px-6 py-2 rounded-sm  cursor-pointer">
        ثبت محصول
      </button>
    </form>
  );
};

export default FormAddProduct;

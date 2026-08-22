"use client";
import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import { CloudUploadIcon, Plus, TrashIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ThumbnailUploader from "../ThumbnailUploader";
import GalleryUploader from "../GalleryUploader";
import {
  createProductAction,
  updateProductAction,
} from "@/src/lib/actions/product.action";
import { useToast } from "@/src/context/toast-context";
import {
  createProductSchema,
  updateProductSchema,
} from "@/src/lib/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType } from "@/src/lib/types/product.type";
import { useRouter } from "next/navigation";
import TextEditor from "@/src/components/common/TextEditor";
import num2persian from "num2persian"
import { numberToPersianWords } from "@/src/lib/helper";

type ProductFormProps = {
  categories: string[];
  product?: ProductType;
  mode: "edit" | "create";
};

const ProductForm = ({ categories, product, mode }: ProductFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(
      mode === "create" ? createProductSchema : updateProductSchema,
    ),
    defaultValues: {
      name: product?.name ?? "",
      categoryId: product?.categoryId ?? "",
      price: product?.price,
      discount: product?.discount,
      description: product?.description ?? "",
      details: product?.details ?? "",
      specification: product?.specification
        ? product.specification
        : [{ key: "", value: "" }],
      stock: product?.stock,
      volume: product?.volume,
      thumbnail: product?.thumbnail ?? undefined,
      gallery: product?.gallery.map((item) => item.url) ?? [],
    },
  });
    const price = watch("price");

  // RHF
  const { fields, remove, append } = useFieldArray({
    name: "specification",
    control,
  });

  // Toast
  const toast = useToast();
  const router = useRouter();

  // ----------------handleform
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

    data.thumbnail instanceof File
      ? formData.append("thumbnail", data.thumbnail)
      : formData.append("thumbnail", data.thumbnail);

    data.gallery.forEach((file) => {
      file instanceof File
        ? formData.append("gallery", file)
        : formData.append("gallery", file);
    });

    formData.append("specification", JSON.stringify(data.specification));

    try {
      if (mode === "create") {
        await createProductAction(formData);
        toast.success("محصول ایجاد شد");
        reset();
      } else {
        console.log("edited");
        await updateProductAction(product?.id, formData);
        toast.success("تغییرات محصول اعمال شد");
        router.push("/admin/products");
      }
    } catch {
      toast.error("مشکلی پیش آمد دوباره امتحان کنید");
    }
  };
  // -----------------

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      {/* ------------------------name------------------------ */}
      <div className="grid grid-cols-2 my-8 gap-4">
        <InputGroupInlineStart
          element="input"
          label="نام محصول"
          {...register("name")}
          classNameLabel="text-base"
          caption={errors.name?.message}
        />
        <div className="flex gap-2 flex-col">
          <label htmlFor="category">دسته‌بندی</label>
          <select
            {...register("categoryId")}
            className="h-12 p-2 text-sm  rounded-sm border border-grey220 outline-0"
          >
            <option value="-1">انتخاب دسته بندی...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className="text-error500">{errors.categoryId?.message}</p>
        </div>
      </div>
      {/* ------------------------category------------------------ */}
      <div className="grid my-8 gap-4 grid-cols-2">
        {/* ------------------------prices------------------------ */}
        <div className="flex flex-col gap-1">
          <InputGroupInlineStart
            element="input"
            label="قیمت"
            {...register("price",{valueAsNumber:true})}
            classNameLabel="text-base"
            type="number"
            caption={errors.price?.message || errors.price?.type}
          />
          {
            price > 0 && (
              <p className="text-muted-foreground text-sm text-start">{numberToPersianWords(price)} تومان</p>
            )
          }
        </div>
        <InputGroupInlineStart
          element="input"
          label="تخفیف"
          {...register("discount")}
          classNameLabel="text-base"
          type="number"
          caption={errors.discount?.message}
        />
      </div>
      {/* ------------------------desc------------------------ */}
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
        <div className="w-full text-start mb-12 flex flex-col gap-2">
          <label>توضیحات تکمیلی</label>
          <Controller
            name="details"
            control={control}
            render={({ field }) => (
              <TextEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>
      {/* ------------------------specification------------------------ */}
      <div className="flex flex-col items-start my-8">
        <div className="flex flex-col gap-x-4 w-full ">
          <div className="flex items-center ">
            <div className="w-1/2 mr-2">ویژگی</div>
            <div className="w-1/2 mr-2">مقدار ویژگی</div>
          </div>
          {fields.map((_, index) => (
            <div className="flex gap-4 items-center">
              <InputGroupInlineStart
                element="input"
                {...register(`specification.${index}.key`)}
                classNameLabel="text-base"
                classNameField=" h-9"
                caption={errors.specification?.[index]?.key?.message}
              />
              <InputGroupInlineStart
                element="input"
                {...register(`specification.${index}.value`)}
                classNameLabel="text-base"
                classNameField=" h-9"
                caption={errors.specification?.[index]?.value?.message}
              />
              <button
                type="button"
                className="w-1/6"
                onClick={() => remove(index)}
              >
                <TrashIcon className="size-5 hover:text-error500 duration-300 transition-all cursor-pointer" />
              </button>
            </div>
          ))}
          <p className="text-error500 text-sm">
            {errors.specification?.message}
          </p>
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

      {/* ------------------------stock------------------------ */}
      <div className="grid grid-cols-2 gap-4 my-8">
        <InputGroupInlineStart
          element="input"
          label="موجودی"
          classNameLabel="text-base"
          {...register("stock")}
          type="number"
          caption={errors.stock?.message}
        />
        {/* ------------------------volume------------------------ */}
        <InputGroupInlineStart
          element="input"
          label="حجم"
          {...register("volume")}
          classNameLabel="text-base"
          icon={"ml(میلی لیتر)"}
          type="number"
          min={0}
          max={100}
          caption={errors.volume?.message}
        />
      </div>
      {/* ------------------------images------------------------ */}

      <div className="grid grid-cols-2 gap-4 my-12">
        <div className="">
          <span>تصویر اصلی محصول</span>
          <ThumbnailUploader
            name="thumbnail"
            setValue={setValue}
            watch={watch}
          />
          <p className="text-error500 text-sm mt-2">
            {errors.thumbnail?.message}
          </p>
        </div>
        <div className="">
          <span> گالری تصاویر محصول</span>
          <GalleryUploader
            name="gallery"
            setValue={setValue}
            watch={watch}
            getValues={getValues}
          />
          <p className="text-error500 text-sm mt-2">
            {errors.gallery?.message}
          </p>
        </div>
      </div>
      {/* ------------------------Button Submit------------------------ */}
      <button
        type="submit"
        disabled={isLoading ? true : false}
        className="bg-black text-white px-6 py-2 rounded-sm  cursor-pointer"
      >
        {mode === "create" ? " ثبت محصول" : "ثبت تغییرات"}
      </button>
    </form>
  );
};

export default ProductForm;

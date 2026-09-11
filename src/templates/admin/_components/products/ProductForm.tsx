
"use client";

import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Prisma } from "@/src/generated/prisma/client";

import { InputGroupInlineStart } from "@/src/components/common/InputGroup";
import ThumbnailUploader from "../ThumbnailUploader";
import GalleryUploader from "../GalleryUploader";
import TextEditor from "@/src/components/common/TextEditor";

import {
  createProductAction,
  updateProductAction,
} from "@/src/lib/actions/product.action";

import { useToast } from "@/src/context/toast-context";

import {
  CreateProductFormValues,
  createProductSchema,
  UpdateProductFormValues,
  updateProductSchema,
} from "@/src/lib/schemas/product.schema";

import { numberToPersianWords } from "@/src/lib/helper";

type ProductFormProps = {
  categories: Prisma.CategoryGetPayload<{
    select: {
      id: true;
      name: true;
    };
  }>[];

  product?: Prisma.ProductGetPayload<{
    include: {
      gallery: true;
      category: true;
    };
  }>;

  mode: "create" | "edit";
};

const ProductForm = ({
  categories,
  product,
  mode,
}: ProductFormProps) => {
  const router = useRouter();
  const toast = useToast();

  const isEdit = mode === "edit";

  const defaultSpecification =
    product?.specification &&
    Array.isArray(product.specification) &&
    product.specification.length > 0
      ? (product.specification as {
          key: string;
          value: string;
        }[])
      : [{ key: "", value: "" }];

  
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProductFormValues>({
    resolver: zodResolver(
      isEdit ? updateProductSchema : createProductSchema,
    ),
    defaultValues: {
      name: product?.name ?? "",
      categoryId: product?.categoryId ?? "",

      price: product?.price ?? undefined,
      discount: product?.discount ?? 0,

      description: product?.description ?? "",
      details: product?.details ?? "",

      specification: defaultSpecification,

      stock: product?.stock ?? 0,
      volume: product?.volume ?? 0,

      thumbnail: product?.thumbnail ?? undefined,

      gallery:
        product?.gallery?.map((item) => item.url) ?? [],
    },
  });

  const price = watch("price");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specification",
  });

  // ------------------------------------------
  // Submit
  // ------------------------------------------

  const onSubmit = async (
    data: UpdateProductFormValues,
  ) => {
    const formData = new FormData();

    /*
     * ------------------------------------------
     * Basic fields
     * ------------------------------------------
     */

    formData.append("name", data.name);

    formData.append(
      "categoryId",
      data.categoryId,
    );

    formData.append(
      "price",
      String(data.price),
    );

    formData.append(
      "discount",
      String(data.discount),
    );

    formData.append(
      "stock",
      String(data.stock),
    );

    formData.append(
      "volume",
      String(data.volume ?? 0),
    );

    formData.append(
      "description",
      data.description,
    );

    formData.append(
      "details",
      data.details ?? "",
    );

    /*
     * ------------------------------------------
     * Specification
     * ------------------------------------------
     */

    formData.append(
      "specification",
      JSON.stringify(
        data.specification ?? [],
      ),
    );

    /*
     * ------------------------------------------
     * Thumbnail
     *
     * Create:
     *   File
     *
     * Update:
     *   File | string
     *
     * ------------------------------------------
     */

    if (data.thumbnail instanceof File) {
      formData.append(
        "thumbnail",
        data.thumbnail,
      );
    }

    /*
     * ------------------------------------------
     * Gallery
     *
     * Create:
     *   File[]
     * Update:
     *   File[] | string[]
     *
     * ------------------------------------------
     */


    if (Array.isArray(data.gallery)) {
      data.gallery.forEach((file) => {
        if (file instanceof File) {
          formData.append("gallery", file);
        }
      });
    }

    /*
     * ------------------------------------------
     * Action
     * ------------------------------------------
     */

    try {
      if (mode === "create") {
        const result =
          await createProductAction(formData);

        if (!result.success) {
          console.error(
            "CREATE PRODUCT ERROR:",
            result,
          );

          toast.error(
            result.message ??
              "ایجاد محصول انجام نشد",
          );

          return;
        }

        toast.success(
          result.message ??
            "محصول با موفقیت ایجاد شد",
        );

        reset({
          name: "",
          categoryId: "",
          price: undefined,
          discount: 0,
          stock: 0,
          volume: 0,
          description: "",
          details: "",
          specification: [
            {
              key: "",
              value: "",
            },
          ],
          thumbnail: undefined,
          gallery: [],
        });

        return;
      }

      /*
       * ----------------------------------------
       * UPDATE
       * ----------------------------------------
       */

      if (!product?.id) {
        toast.error(
          "شناسه محصول پیدا نشد",
        );
        return;
      }

      const result =
        await updateProductAction(
          product.id,
          formData,
        );

      if (!result.success) {
        console.error(
          "UPDATE PRODUCT ERROR:",
          result,
        );

        toast.error(
          result.message ??
            "ویرایش محصول انجام نشد",
        );

        return;
      }

      toast.success(
        result.message ??
          "تغییرات محصول با موفقیت ذخیره شد",
      );

      router.push("/admin/products");
    } catch (error) {
      console.error(
        "PRODUCT FORM ERROR:",
        error,
      );

      toast.error(
        "مشکلی پیش آمد، دوباره امتحان کنید",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full text-center"
      dir="rtl"
    >
      {/* ======================================
          اطلاعات اصلی
      ====================================== */}

      <section className="my-8">
        <h2 className="mb-5 text-right text-lg font-semibold">
          اطلاعات محصول
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}

          <InputGroupInlineStart
            element="input"
            label="نام محصول"
            {...register("name")}
            classNameLabel="text-base"
            caption={errors.name?.message}
          />

          {/* Category */}

          <div className="flex flex-col gap-2 text-right">
            <label
              htmlFor="categoryId"
              className="text-base"
            >
              دسته‌بندی
            </label>

            <select
              id="categoryId"
              {...register("categoryId")}
              className="
                h-12
                rounded-sm
                border
                border-grey220
                bg-white
                p-2
                text-sm
                outline-none
              "
            >
              <option value="">
                انتخاب دسته‌بندی...
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {errors.categoryId?.message && (
              <p className="text-sm text-error500">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ======================================
          قیمت و موجودی
      ====================================== */}

      <section className="my-8">
        <h2 className="mb-5 text-right text-lg font-semibold">
          قیمت و موجودی
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Price */}

          <div className="flex flex-col gap-1">
            <InputGroupInlineStart
              element="input"
              label="قیمت"
              type="number"
              min={0}
              {...register("price")}
              classNameLabel="text-base"
              caption={errors.price?.message}
            />

            {Number(price) > 0 && (
              <p className="text-start text-sm text-muted-foreground">
                {numberToPersianWords(
                  Number(price),
                )}{" "}
                تومان
              </p>
            )}
          </div>

          {/* Discount */}

          <InputGroupInlineStart
            element="input"
            label="تخفیف (درصد)"
            type="number"
            min={0}
            max={100}
            {...register("discount")}
            classNameLabel="text-base"
            caption={errors.discount?.message}
          />

          {/* Stock */}

          <InputGroupInlineStart
            element="input"
            label="موجودی"
            type="number"
            min={0}
            {...register("stock")}
            classNameLabel="text-base"
            caption={errors.stock?.message}
          />

          {/* Volume */}

          <InputGroupInlineStart
            element="input"
            label="حجم"
            type="number"
            min={0}
            {...register("volume")}
            classNameLabel="text-base"
            icon="ml (میلی‌لیتر)"
            caption={errors.volume?.message}
          />
        </div>
      </section>

      {/* ======================================
          توضیحات
      ====================================== */}

      <section className="my-12">
        <h2 className="mb-5 text-right text-lg font-semibold">
          توضیحات
        </h2>

        <div className="flex flex-col gap-8">
          {/* Short description */}

          <InputGroupInlineStart
            element="textarea"
            label="توضیحات کوتاه"
            {...register("description")}
            classNameLabel="text-base"
            classNameInput="min-h-40"
            caption={
              errors.description?.message
            }
          />

          {/* Details */}

          <div className="flex flex-col gap-2 text-start">
            <label className="text-base">
              توضیحات تکمیلی
            </label>

            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <TextEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.details?.message && (
              <p className="text-sm text-error500">
                {errors.details.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ======================================
          Specification
      ====================================== */}

      <section className="my-10 text-right">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            ویژگی‌های محصول
          </h2>

          <button
            type="button"
            onClick={() =>
              append({
                key: "",
                value: "",
              })
            }
            className="
              flex
              cursor-pointer
              items-center
              gap-1
              rounded-sm
              border
              border-grey220
              bg-gray-50
              px-3
              py-2
              text-sm
              transition
              hover:bg-gray-100
            "
          >
            <Plus className="size-4" />
            افزودن ویژگی
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Header */}

          <div className="hidden grid-cols-[1fr_1fr_40px] gap-4 px-1 text-sm text-gray-500 md:grid">
            <span>ویژگی</span>
            <span>مقدار ویژگی</span>
            <span />
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="
                grid
                grid-cols-1
                items-center
                gap-3
                md:grid-cols-[1fr_1fr_40px]
                md:gap-4
              "
            >
              <InputGroupInlineStart
                element="input"
                {...register(
                  `specification.${index}.key`,
                )}
                classNameField="h-9"
                caption={
                  errors.specification?.[
                    index
                  ]?.key?.message
                }
              />

              <InputGroupInlineStart
                element="input"
                {...register(
                  `specification.${index}.value`,
                )}
                classNameField="h-9"
                caption={
                  errors.specification?.[
                    index
                  ]?.value?.message
                }
              />

              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="
                  flex
                  size-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-md
                  text-gray-400
                  transition
                  hover:bg-error100
                  hover:text-error500
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="حذف ویژگی"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}

          {errors.specification?.message && (
            <p className="text-sm text-error500">
              {errors.specification.message}
            </p>
          )}
        </div>
      </section>

      {/* ======================================
          تصاویر
      ====================================== */}

      <section className="my-12">
        <h2 className="mb-5 text-right text-lg font-semibold">
          تصاویر محصول
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Thumbnail */}

          <div className="flex flex-col gap-3">
            <span className="text-right">
              تصویر اصلی محصول
            </span>

            <ThumbnailUploader
              name="thumbnail"
              setValue={setValue}
              watch={watch}
            />

            {errors.thumbnail?.message && (
              <p className="text-right text-sm text-error500">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Gallery */}

          <div className="flex flex-col gap-3">
            <span className="text-right">
              گالری تصاویر محصول
            </span>

            <GalleryUploader
              name="gallery"
              setValue={setValue}
              watch={watch}
              getValues={getValues}
            />

            {errors.gallery?.message && (
              <p className="text-right text-sm text-error500">
                {errors.gallery.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ======================================
          Submit
      ====================================== */}

      <div className="my-10 flex justify-end border-t pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex
            min-w-36
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-md
            bg-black
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-gray-800
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting && (
            <Loader2 className="size-4 animate-spin" />
          )}

          {isSubmitting
            ? isEdit
              ? "در حال ذخیره..."
              : "در حال ثبت..."
            : isEdit
              ? "ثبت تغییرات"
              : "ثبت محصول"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;


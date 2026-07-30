"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ProductType } from "@/src/lib/types/product.type";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { deleteProductAction } from "@/src/lib/actions/product.action";
import { useToast } from "@/src/app/ToastProvider";
import Swal from "sweetalert2";

export default function ProductDetailTemplate({
  product,
}: {
  product: ProductType;
}) {
  const router = useRouter();
  const toast = useToast();
  const onDelete = (productId) => {
    if (!productId) return;
    Swal.fire({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const product = await deleteProductAction(productId);
        if (product.success) {
          toast.info("محصول مورد نظر حذف شد");
          router.refresh();
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-4 py-2 md:gap-6 border-none">
      {/* head-detail */}
      <div className="bg-white flex justify-between items-center p-4 rounded-sm">
        <div>
          <span className="text-lg">جزئیات محصول </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onDelete(product.id)} className="px-3 cursor-pointer group py-1 rounded-sm bg-error100 border border-error100 text-sm">
            <TrashIcon className="text-error400 size-5 " />
          </button>
          <Link
            className="px-3 py-1 rounded-sm bg-warning100 text-warning400 border border-warning400 text-sm"
            href={`/admin`}
          >
            ویرایش
          </Link>
          <button
            className="px-3 py-1 rounded-sm bg-zinc-50 border border-grey220 text-sm cursor-pointer"
            onClick={() => router.back()}
          >
            بازگشت
          </button>
        </div>
      </div>
      <Card className="bg-white ">
        <CardContent>
          <div className="grid grid-cols-2">
            {/* right */}
            <div className="col-span-1 bg-white p-4">
              <div className="flex gap-6 flex-col items-start">
                <p className="space-x-1.5">
                  <b>عنوان(نام) محصول: </b>
                  <span className="text-muted-foreground">
                    {product.latinName}
                  </span>
                </p>
                <p className="space-x-1.5">
                  <b>اسلاگ:</b>
                  <span className="text-muted-foreground max-w-75 truncate">
                    {product.slug}
                  </span>
                </p>
                <p className="space-x-1.5">
                  <b>قیمت: </b>
                  <span className="text-primary font-bold text-lg">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </span>
                </p>
                <p className="space-x-1.5">
                  <b>دسته‌بندی: </b>
                  <span className="text-muted-foreground">
                    {product.category.name}
                  </span>
                </p>
                <p className="space-x-1.5">
                  {product.stock ? (
                    <>
                      <b>موجود</b>
                      <span className="text-success600 px-4 rounded-2xl bg-success100 py-0.5">
                        {product.stock.toLocaleString("fa-IR")} عدد
                      </span>
                    </>
                  ) : (
                    <>
                      <b>ناموجود</b>
                      <span className="text-error500 px-4 rounded-2xl bg-error100 py-0.5">
                        {product.stock.toLocaleString("fa-IR")} عدد
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* left */}
            <div className="col-span-1 grid grid-cols-4 grid-rows-2 gap-2  p-4 rounded-lg">
              {/* thumbnail */}
              <Image
                src={product.thumbnail}
                width={400}
                height={400}
                className="col-span-2 row-span-2 rounded-sm border border-grey220"
                alt="product thumbnail"
              />
              {product.gallery.map((img) => (
                <Image
                  src={img.url}
                  width={400}
                  height={400}
                  className="col-span-1 row-span-1 rounded-sm border border-grey220"
                  alt="product thumbnail"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ----------------- */}
      <Card className="bg-white">
        <CardContent>
          <div className="flex gap-6 flex-col items-start p-4">
            <p className="space-x-1.5 flex flex-col gap-1">
              <b>توضیحات کوتاه: </b>
              <span className="text-muted-foreground line-clamp-4">
                {product.description}
              </span>
            </p>
            <p className="space-x-1.5 flex flex-col gap-1">
              <b>توضیحات جزئی: </b>
              <span className="text-muted-foreground line-clamp-4">
                <div
                  className="product-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.details ?? ""),
                  }}
                />
              </span>
            </p>
            <p className="space-x-1.5 flex flex-col gap-1">
              {product.specification && (
                <>
                  <b>مشخصات محصول: </b>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="bg-transparent">
                        <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-1/3">
                          حجم
                        </td>
                        <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-full">
                          {Number(product.volume).toLocaleString("fa-IR")}{" "}
                          میلی‌لیتر
                        </td>
                      </tr>
                      {product.specification.map((item, idx) => (
                        <tr
                          className={`w-full   ${idx % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                        >
                          <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-1/3">
                            {item.key}
                          </td>
                          <td className="p-2.5 w-1/2 leading-6 lg:leading-8 lg:w-full">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

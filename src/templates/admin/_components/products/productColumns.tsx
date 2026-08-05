"use client";
import { ProductType } from "@/src/lib/types/product.type";
import ProductActions from "@/src/templates/admin/_components/products/ProductActions";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";




export const productColumns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "thumbnail",
    header: "تصویر",
    cell: ({ row }) => (
      <Image
        src={row.original.thumbnail}
        alt={row.original.name}
        className="w-14 h-14"
        width={250}
        height={250}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "نام محصول",
  },
  {
    accessorKey: "price",
    header: "قیمت",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <span>{row.original.price.toLocaleString("fa-IR")}</span>
        <span>تومان</span>
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: "موجودی",
  },
  {
    accessorKey: "volume",
    header: "حجم(ml)",
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: ({ row }) => (
      <ProductActions productId={row.original.id} slug={row.original.slug}/>
    ),
  },
];

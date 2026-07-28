"use client";
import { ProductType } from "@/src/lib/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
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
      <div className="flex justify-center items-center gap-2.5">
        {/* edit */}
        <Link href={"/"} className="cursor-pointer">
          <PencilIcon className="size-4" />
        </Link>
        {/* view */}
        <Link href={"/"} className="cursor-pointer">
          <EyeIcon className="size-4" />
        </Link>
        {/* delted */}
        <button className="cursor-pointer">
          <TrashIcon className="size-4" />
        </button>
      </div>
    ),
  },
];

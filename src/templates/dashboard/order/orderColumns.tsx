"use client"
import { OrderType } from "@/src/lib/types/orders.type";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";

export const orderColumns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "refId",
    header: "شماره سفارش",
    cell: ({ row }) => <span>{row.original.payment?.refId}</span>,
  },
  {
    accessorKey: "paidAt",
    header: "تاریخ ثبت سفارش",
    cell: ({ row }) => (
      <span>
        {row.original.payment?.paidAt?.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "وضعیت سفارش",
    cell: ({ row }) => (
      <span>
        {(row.original.status === "PAID" && (
          <div className="bg-success600 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
            تکمیل شده
          </div>
        )) ||
          (row.original.status === "PENDING" && (
            <div className="bg-pending px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
              درحال انجام
            </div>
          )) ||
          (row.original.status === "FAILED" && (
            <div className="bg-error500 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
              لغو شده
            </div>
          ))}
      </span>
    ),
  },
  {
    accessorKey:"detail",
    header:"وضعیت سفارش",
    cell:() => (
        <PlusCircleIcon className="size-5" />
    )
  }
];

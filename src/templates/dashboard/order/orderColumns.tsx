"use client";
import { OrderType } from "@/src/lib/types/orders.type";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";

export const orderColumns: ColumnDef<OrderType>[] = [
  {
    id:"paymentStatus",
    accessorFn:(row) =>  row.payment?.status,
    header: () => <span className="text-primary">شماره سفارش</span>,
    cell: ({ row }) => <p>{row.original.status === "PAID" ? row.original.payment?.refId : <span className="text-gray-400">پرداخت نشده</span>}</p>,
  },
  {
    accessorKey: "paidAt",
    header: () => <span className="text-primary">تاریخ ثبت سفارش</span>,
    cell: ({ row }) => (
      <span>
        {row.original.createdAt?.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => <span className="text-primary">وضعیت سفارش</span>,
    cell: ({ row }) => (
      <span>
        {(row.original.status === "PAID" && (
          <div className="bg-success600 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
            پرداخت شده
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
    id: "detail",
    header: () => <span className="text-primary">جزئیات سفارش</span>,
    cell: () => (
      <div className="flex justify-center">
        <PlusCircleIcon className="size-5 cursor-pointer" />
      </div>
    ),
  },
];

"use client";
import { CommentType } from "@/src/lib/types/comment.type";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import CommentActions from "./CommentActions";

const showComment = (bodyComment) => {
  Swal.fire({
    text: bodyComment,
  });
};



export const commentColumns: ColumnDef<CommentType>[] = [
  {
    accessorKey: "product",
    header: "محصول",
    cell: ({ row }) => row.original.product.name,
  },
  {
    accessorKey: "user",
    header: "ایمیل کاربر",
    cell: ({ row }) => row.original.user.email,
  },
  {
    accessorKey: "body",
    header: "متن دیدگاه",
    cell: ({ row }) => (
      <button
        className="bg-grey220 px-4 py-1 rounded-sm border border-grey220 cursor-pointer"
        onClick={() => showComment(row.original.body)}
      >
        مشاهده متن
      </button>
    ),
  },
  {
    accessorKey: "score",
    header: "امتیاز",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {Array.from({ length: row.original.score }).map((i) => (
          <Star className="text-warning400 fill-warning400 size-4" />
        ))}
        {Array.from({ length: 5 - row.original.score }).map((i) => (
          <Star className="stroke-1 stroke-warning400 size-4" />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "عملیات",
    cell: ({ row }) => <CommentActions comment={row.original}/>,
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        {(row.original.status === "ACCEPT" && (
          <div className="w-fit px-4 py-1 rounded-3xl bg-success100 text-success600">
            تایید شده
          </div>
        )) ||
          (row.original.status === "PENDING" && (
            <div className="w-fit px-4 py-1 rounded-3xl bg-warning100 text-warning400">
              در انتظار تایید
            </div>
          )) ||
          (row.original.status === "REJECTED" && (
            <div className="w-fit px-4 py-1 rounded-3xl bg-error100 text-error500">
              رد شده
            </div>
          ))}
      </div>
    ),
  },
];

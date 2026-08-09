"use client";
import { UserType } from "@/src/lib/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { Role } from "@/src/generated/prisma/enums";
import { UsersActions } from "./UsersActions";

export const userColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: "username",
    header: "نام کاربر",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ عضویت",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "role",
    header: "نقش",
    cell: ({ row }) => {
      return (
        <div className="w-full flex justify-center">

        <div
          className={`w-fit px-4 py-1 rounded-3xl text-center ${row.original.role === Role.ADMIN ? "bg-black text-white" : "bg-sky-100 text-sky-500"} text-success600`}
          >
          {row.original.role === Role.ADMIN ? "ادمین" : "کاربر"}
        </div>
          </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "عملیات",
    cell: ({ row }) => (
      <UsersActions user={row.original}/>
    ),
  },
];

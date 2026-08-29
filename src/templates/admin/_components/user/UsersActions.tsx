"use client";

import { BanIcon, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { toggleBanUser } from "@/src/lib/actions/user.action";
import { useToast } from "@/src/context/toast-context";
import Swal from "sweetalert2";
import { Prisma } from "@/src/generated/prisma/client";

type UsersActionsProps = Prisma.UserGetPayload<{
  select: {
    id: true;
    isBanned: true;
  };
}>;
export function UsersActions({ user }: { user: UsersActionsProps }) {
  const toast = useToast();
  const banUserHandler = async (userId: string) => {
    Swal.fire({
      title: `آیا از ${user.isBanned ? "رفع مسدودیت" : "مسدود کردن"} کاربر مطمئنید؟`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const result = await toggleBanUser(userId);
        if (result.success !== true) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
        }
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem>
          <Link
            href={`/admin/users/${user.id}`}
            className="flex gap-1 items-center"
          >
            <Eye />
            مشاهده جزئیات
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => banUserHandler(user.id)}
        >
          <BanIcon size={16} />
          {user.isBanned ? "رفع مسدودیت" : "مسدود"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

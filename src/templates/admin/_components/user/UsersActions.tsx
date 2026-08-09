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
import { UserType } from "@/src/lib/types/user.type";
import { toggleBanUser } from "@/src/lib/actions/user.action";
import { useToast } from "@/src/context/toast-context";
import Swal from "sweetalert2";

export function UsersActions({ user }: UserType) {
  const toast = useToast();
  const banUserHandler = async (userId) => {
    Swal.fire({
      title: `آیا از ${user.isBanned ? 'رفع بن' :'بن'} کاربر مطمئنید؟`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const result = await toggleBanUser(userId);
        if (result.error) {
          toast.error(result.error);
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
          {user.isBanned ? "رفع بن" : "بن"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

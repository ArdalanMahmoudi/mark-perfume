"use client";

import { BanIcon, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { toggleBanUser } from "@/src/lib/actions/user.action";
import { useToast } from "@/src/context/toast-context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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
  const [isPending, setIsPending] = useState(false);
  const banUserHandler = async (userId: string) => {
    Swal.fire({
      title: `آیا از ${user.isBanned ? "رفع مسدودیت" : "مسدود کردن"} کاربر مطمئنید؟`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then(async (res) => {
      if (res.isConfirmed) {
        setIsPending(true);
        try {
          const result = await toggleBanUser(userId);
          if (result.success !== true) {
            toast.error(result.message);
          } else {
            toast.success(result.message);
        }
        } finally {
          setIsPending(false);
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
          disabled={isPending}
          onClick={() => banUserHandler(user.id)}
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <BanIcon size={16} />}
          {isPending ? "در حال انجام..." : user.isBanned ? "رفع مسدودیت" : "مسدود"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

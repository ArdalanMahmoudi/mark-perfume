"use client";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/context/toast-context";
import { Prisma } from "@/src/generated/prisma/client";
import { toggleBanUser } from "@/src/lib/actions/user.action";
import { Ban, ShieldCheck, User } from "lucide-react";
import Swal from "sweetalert2";

export function UserSummaryHeader({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: {
      id: true;
      isBanned: true;
      image: true;
      username: true;
      email: true;
      createdAt: true;
      role: true;
    };
  }>;
}) {
  const toast = useToast();
  const banUserHandler = async (userId:string) => {
    Swal.fire({
      title: `آیا از ${user.isBanned ? "رفع مسدودیت" : "مسدود"} کاربر مطمئنید؟`,
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary overflow-hidden">
          {user.image ? (
            <img
              src={user.image}
              alt={user.username ?? "کاربر"}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="size-8" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">{user.username ?? "بدون نام"}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
          <p className="text-muted-foreground text-xs">
            عضویت از {new Date(user.createdAt).toLocaleDateString("fa-IR")}
          </p>
          <div className="flex gap-2 mt-1">
            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
              {user.role === "ADMIN" ? "ادمین" : "کاربر"}
            </Badge>
            <Badge variant={user.isBanned ? "destructive" : "outline"}>
              {user.isBanned ? "مسدود شده" : "فعال"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <ShieldCheck className="size-4 ml-1" />
          {user.role === "ADMIN" ? "تنزل به کاربر" : "ارتقا به ادمین"}
        </Button>
        <Button
          onClick={() => banUserHandler(user.id)}
          variant={user.isBanned ? "outline" : "destructive"}
          size="sm"
        >
          <Ban className="size-4 ml-1" />
          {user.isBanned ? "رفع مسدودیت" : "مسدود کردن"}
        </Button>
      </div>
    </div>
  );
}

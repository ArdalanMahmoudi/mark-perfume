import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { UserType } from "@/src/lib/types/user.type";
import { Ban, ShieldCheck, User } from "lucide-react";



export function UserSummaryHeader({ user }: {user:UserType}) {
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
        <Button variant={user.isBanned ? "outline" : "destructive"} size="sm">
          <Ban className="size-4 ml-1" />
          {user.isBanned ? "رفع مسدودیت" : "مسدود کردن"}
        </Button>
      </div>
    </div>
  );
}

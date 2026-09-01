"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  Info,
  LogOut,
  MessageCircle,
  Package,
  StoreIcon,
  TicketIcon,
  UsersIcon,
} from "lucide-react";
import ActiveLink from "@/src/components/common/ActiveLink";
import Image from "next/image";
import { CommandPallet } from "@/src/components/common/CommandPallet";
import Swal from "sweetalert2";
import { useToast } from "@/src/context/toast-context";

export const Sidebar = () => {

  const toast = useToast();
  const router = useRouter();
  const handleLogout = async () => {
    Swal.fire({
      title: "خروج از حساب کاربری",
      text: "آیا میخواهید از حسابتان خارج شوید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
      customClass: {
        confirmButton: "bg-primary! text-white!",
      },
    }).then(async (res) => {
      if (res.isConfirmed) {
        const result = await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-type": "application/json" },
        });

        if (!result.ok) {
          toast.error("مشکلی پیش آمد مجدد امتحان کنید");
          return;
        }
        toast.success("خروج از حساب کاربری انجام شد");
        router.refresh();
      }
    });
  };
  return (
    <div className="relative h-full flex-1 px-4 py-2 bg-gray-50 border-l border-grey220 shadow shadow-black/10">
      <CommandPallet />
      {/*   */}

      <ul className="py-4 gap-3 flex flex-col font-Vazir-R">
        <ActiveLink
          activeClassName="bg-grey220 hover:bg-grey220! text-black!"
          href={"/admin"}
          className="cursor-pointer text-muted-foreground hover:bg-muted text-sm gap-1 focus-visible:outline-2  outline-offset-4 flex flex-row items-center h-9 origin-left rounded-md  group bg-gray-50 pr-5"
        >
          <HomeIcon className="size-4" />
          <span className="flex-1 min-w-0 text-heading-14 font-medium flex items-center gap-1.5">
            پیشخوان
          </span>
        </ActiveLink>
        <ActiveLink
          activeClassName="bg-grey220 hover:bg-grey220! text-black!"
          href={"/admin/products"}
          className="cursor-pointer text-muted-foreground hover:bg-muted text-sm gap-1 focus-visible:outline-2  outline-offset-4 flex flex-row items-center h-9 origin-left rounded-md  group bg-gray-50 pr-5"
        >
          <Package className="size-4 " />
          محصولات
        </ActiveLink>
        <ActiveLink
          activeClassName="bg-grey220 hover:bg-grey220! text-black!"
          href={"/admin/users"}
          className="cursor-pointer text-muted-foreground hover:bg-muted text-sm gap-1 focus-visible:outline-2  outline-offset-4 flex flex-row items-center h-9 origin-left rounded-md  group bg-gray-50 pr-5"
        >
          <UsersIcon className="size-4 " />
          کاربران
        </ActiveLink>
        <ActiveLink
          activeClassName="bg-grey220 hover:bg-grey220! text-black!"
          href={"/admin/comments"}
          className="cursor-pointer text-muted-foreground hover:bg-muted text-sm gap-1 focus-visible:outline-2  outline-offset-4 flex flex-row items-center h-9 origin-left rounded-md  group bg-gray-50 pr-5"
        >
          <MessageCircle className="size-4 " />
          کامنت ها
        </ActiveLink>
       
        <ActiveLink
          activeClassName="bg-grey220 hover:bg-grey220! text-black!"
          href={"/"}
          className="cursor-pointer text-muted-foreground hover:bg-muted text-sm gap-1 focus-visible:outline-2  outline-offset-4 flex flex-row items-center h-9 origin-left rounded-md  group bg-gray-50 pr-5"
        >
          <StoreIcon className="size-4 " />
          برگشت به سایت
        </ActiveLink>
       

        <button onClick={handleLogout} className="flex text-error500 gap-1 text-sm border border-grey220 items-center p-2.5 rounded-lg  hover:bg-error500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer ">
          <LogOut className="size-4" />
          <p>خروج از حساب کاربری</p>
        </button>
      </ul>
    </div>
  );
};

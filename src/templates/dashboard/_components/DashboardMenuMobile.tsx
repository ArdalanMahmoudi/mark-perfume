"use client";
import ActiveLink from "@/src/components/common/ActiveLink";
import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { useToast } from "@/src/context/toast-context";
import {
  CircleGauge,
  Heart,
  ListOrdered,
  LogOutIcon,
  MessageCircle,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const activeLinks = [
  {
    id: 1,
    title: "داشبورد",
    href: "/dashboard",
    icon: <CircleGauge size={14} />,
  },
  {
    id: 2,
    title: "علاقه مندی‌ها",
    href: "/dashboard/wishlist",
    icon: <Heart size={14} />,
  },
  {
    id: 3,
    title: "دیدگاه‌ها",
    href: "/dashboard/comment",
    icon: <MessageCircle size={14} />,
  },
  {
    id: 4,
    title: "سفارش‌ها",
    href: "/dashboard/order",
    icon: <ListOrdered size={14} />,
  },
  {
    id: 5,
    title: "تیکت‌ها",
    href: "/dashboard/ticket",
    icon: <Ticket size={14} />,
  },
  {
    id: 6,
    title: "اطلاعات حساب کاربری",
    href: "/dashboard/userinfo",
    icon: <User size={14} />,
  },
];

const DashboardMenuMobile = ({ username, profileImg }:{ username:string, profileImg:string}) => {
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
    <Drawer direction={"right"}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-white border lg:hidden border-primary text-black flex gap-1 items-center justify-center fixed bottom-5 left-5 w-12 h-12 z-10  cursor-pointer rounded-full shadow  shadow-grey220"
        >
          <CircleGauge className="size-5 text-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none! overflow-y-auto gap-4 data-[vaul-drawer-direction=bottom]:max-h-[50vh] w-[90%]! data-[vaul-drawer-direction=top]:max-h-[50vh]  bg-secondary p-5 flex flex-col items-center">
        <div className="w-full flex justify-center! text-center p-0">
          <Image
            className="rounded-full border border-primary size-24"
            src={profileImg ? profileImg : "/images/user.png"}
            width={100}
            height={100}
            alt="profile image"
          />
        </div>
        <p className="text-primary">{username}</p>
        {/* Routes */}
        {activeLinks.map((link) => (
          <DrawerClose key={link.id} className="w-full" asChild>
            <ActiveLink
              href={link.href}
              className="flex items-center p-2.5 bg-white rounded-sm border border-grey220 w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
              activeClassName="text-primary"
            >
              {link.icon}
              <span>{link.title}</span>
            </ActiveLink>
          </DrawerClose>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center p-2.5 bg-white text-error500 rounded-sm border border-grey220 w-full gap-1 cursor-pointer hover:bg-error500 hover:text-white transition-colors duration-300"
        >
          <LogOutIcon className="size-4" />
          <p>خروج از حساب کاربری</p>
        </button>
      </DrawerContent>
    </Drawer>
  );
};

export default DashboardMenuMobile;

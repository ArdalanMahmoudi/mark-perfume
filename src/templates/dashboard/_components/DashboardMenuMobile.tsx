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
  GaugeCircle,
  Heart,
  ListOrdered,
  LogOutIcon,
  MessageCircle,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";

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

const DashboardMenuMobile = ({
  userName,
  userImage,
}: {
  userName: string;
  userImage: string;
}) => {
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
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="میانبرها"
          title="میانبرها"
          className="
        fixed bottom-6 right-6 z-50
        size-12 rounded-full
        bg-primary text-white
        flex items-center justify-center
        shadow-lg
        hover:scale-105 hover:shadow-xl
        active:scale-95
        transition-all duration-200
        cursor-pointer
        lg:hidden
      "
        >
          <GaugeCircle size={21} strokeWidth={2} />
        </button>
      </DrawerTrigger>

      <DrawerContent
        className="
      h-full w-[320px]! max-w-[90vw]
      rounded-none!
      bg-secondary
      border-l border-grey220
      p-5
      flex flex-col items-center
      gap-5
      overflow-y-auto
    "
      >
        <div className="w-full flex justify-center">
          <Image
            className="rounded-full border border-primary size-24 object-cover"
            src={userImage}
            width={100}
            height={100}
            alt="profile image"
          />
        </div>

        <p className="text-primary font-semibold">{userName}</p>

        <div className="w-full flex flex-col gap-2">
          {activeLinks.map((link) => (
            <DrawerClose key={link.id} asChild>
              <ActiveLink
                href={link.href}
                className="
              flex items-center gap-2
              p-3 w-full
              bg-white rounded-md
              border border-grey220
              cursor-pointer
              hover:text-primary
              hover:border-primary/30
              transition-colors duration-200
            "
                activeClassName="text-primary border-primary"
              >
                {link.icon}
                <span>{link.title}</span>
              </ActiveLink>
            </DrawerClose>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="
        flex items-center gap-2
        p-3 w-full
        bg-white text-error500
        rounded-md border border-grey220
        cursor-pointer
        hover:bg-error500 hover:text-white
        transition-colors duration-200
      "
        >
          <LogOutIcon size={16} />
          <span>خروج از حساب کاربری</span>
        </button>
      </DrawerContent>
    </Drawer>
  );
};

export default DashboardMenuMobile;

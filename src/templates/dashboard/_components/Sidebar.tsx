import ActiveLink from "@/src/components/common/ActiveLink";
import {
  ChartLine,
  CircleGauge,
  Delete,
  Heart,
  ListOrdered,
  LogOut,
  Map,
  MessageCircle,
  SearchCheck,
  Ticket,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import React from "react";

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

const Sidebar = ({ userName, userImage }) => {
  return (
    <div className="sticky top-8 h-fit w-full hidden lg:flex flex-col gap-4 border border-grey220 p-5 rounded-lg bg-secondary min-w-60">
      {/* user image */}
      <div className="flex justify-center">
        <Image
          className="w-25 rounded-full border border-primary"
          src={`${userImage ? userImage : "/images/user.png"}`}
          width={260}
          height={260}
          alt="user image"
        />
      </div>
      {/* user name */}
      <p className="text-primary text-center">{userName}</p>
      {/* dashboard routes */}
      {activeLinks.map((link) => (
        <ActiveLink
          key={link.id}
          href={link.href}
          activeClassName="text-white bg-primary! hover:text-white"
          className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
        >
          {link.icon}
          <p>{link.title}</p>
        </ActiveLink>
      ))}

      <button className="flex text-error500 gap-1 text-sm border border-grey220 items-center p-2.5 rounded-lg bg-white hover:bg-error500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer ">
        <LogOut className="size-4" />
        <p>خروج از حساب کاربری</p>
      </button>
    </div>
  );
};

export default Sidebar;

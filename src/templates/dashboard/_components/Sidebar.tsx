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

const Sidebar = ({userName, userImage}) => {
  return (
    <div className="sticky top-8 h-fit w-full flex flex-col gap-4 border border-grey220 p-5 rounded-lg bg-secondary min-w-60">
      {/* user image */}
      <div className="flex justify-center">

        <Image
          className="w-25 rounded-full border border-primary"
          src={`${userImage? userImage : "/images/user.png"}`}
          width={260}
          height={260}
          alt="user image"
        />
      </div>
      {/* user name */}
      <p className="text-primary text-center">{userName}</p>
      {/* dashboard item */}
      <ActiveLink
        href={"/dashboard"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <CircleGauge className="size-4" />
        <p>داشبورد</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/wishlist"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <Heart className="size-4" />
        <p>علاقه مندی‌ها</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/comment"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <MessageCircle className="size-4" />
        <p>دیدگاه‌ها</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/ticket"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <Ticket className="size-4" />
        <p>تیکت‌ها</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/userinfo"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <User className="size-4" />
        <p>اطلاعات حساب کاربری</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/order"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <ListOrdered className="size-4" />
        <p>سفارش‌ها</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/tracking"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <SearchCheck className="size-4" />
        <p>پیگیری سفارش</p>
      </ActiveLink>
      <ActiveLink
        href={"/dashboard/return"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <Delete className="size-4" />
        <p>مرجوع کردن</p>
      </ActiveLink>

      <ActiveLink
        href={"/dashboard/compare"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <ChartLine className="size-4" />
        <p>مقایسه‌ها</p>
      </ActiveLink>

      <ActiveLink
        href={"/dashboard/address"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <Map className="size-4" />
        <p>آدرس‌ها</p>
      </ActiveLink>

      <ActiveLink
        href={"/dashboard/wallet"}
        activeClassName="text-white bg-primary! hover:text-white"
        className="flex text-black gap-1 text-sm bg-white border border-grey220 items-center p-2.5 rounded-lg  hover:text-primary transition-all duration-300 ease-in-out cursor-pointer "
      >
        <Wallet className="size-4" />
        <p>کیف‌ پول</p>
      </ActiveLink>

      <button className="flex text-error500 gap-1 text-sm border border-grey220 items-center p-2.5 rounded-lg bg-white hover:bg-error500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer ">
        <LogOut className="size-4" />
        <p>خروج از حساب کاربری</p>
      </button>
    </div>
  );
};

export default Sidebar;

"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  HomeIcon, Info, LogOut, MessageCircle, Package, TicketIcon, UsersIcon } from "lucide-react";
import ActiveLink from "@/src/components/common/ActiveLink";




export const Sidebar = () => {

  const pathName = usePathname()
  return (
    <div className="relative h-full flex-1 px-4 sm:px-6 glass shadow shadow-black/10">
      <div className="sticky top-0 flex flex-col justify-between inset-0">


        {/*   */}
        <ul className="py-4 gap-3 flex flex-col font-Vazir-R">
          <li className="py-3 hover:text-purple-400 cursor-pointer border-b border-white/10 px-4 rounded-lg text-gray-300">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/admin"}
              className=" flex items-center gap-2"
            >
              <HomeIcon className="size-6" />
              پیشخوان
            </ActiveLink>
          </li>
          <li className=" hover:text-purple-400 text-gray-300 py-3 group cursor-pointer border-b border-white/10 px-4 rounded-lg">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/admin/products"}
              className=" flex items-center gap-2"
            >
              <Package className="size-6 " />
              محصولات
            </ActiveLink>
          </li>
          <li className="hover:text-purple-400 py-3 group cursor-pointer border-b border-white/10 px-4 rounded-lg text-gray-300">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/admin/users"}
              className="   flex items-center gap-2"
            >
              <UsersIcon className="size-6 " />
              کاربران
            </ActiveLink>
          </li>
          <li className=" hover:text-purple-400 py-3 group cursor-pointer border-b border-white/10 px-4 rounded-lg text-gray-300">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/admin/comments"}
              className={`    flex items-center gap-2`}
            >
              <MessageCircle className="size-6 " />
              کامنت ها
            </ActiveLink>
          </li>
          <li className="hover:text-purple-400 py-3 group cursor-pointer border-b border-white/10 px-4 rounded-lg text-gray-300">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/admin/tickets"}
              className={`   flex items-center gap-2`}
            >
              <TicketIcon className="size-6 " />
              تیکت ها
            </ActiveLink>
          </li>
          <li className=" hover:text-purple-400 py-3 group cursor-pointer border-b border-white/10 px-4 rounded-lg text-gray-300">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/admin/profile"}
              className={`    flex items-center gap-2`}
            >
              <Info className="size-6  " />
              جزئیات حساب
            </ActiveLink>
          </li>
          <li className="hover:text-purple-400 py-3 group cursor-pointer border-b border-white/10 px-4 rounded-lg text-gray-300">
            <ActiveLink
            activeClassName="text-purple-400"
              href={"/"}
              className=" text-white group-hover:text-red-500 flex items-center gap-2"
            >
              <LogOut className="size-6 group-hover:text-red-500 text-gray-300" />
              خروج
            </ActiveLink>
          </li>

        </ul>
      </div>
    </div>
  );
}



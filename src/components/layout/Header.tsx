"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  BookText,
  ChevronLeft,
  CircleQuestionMark,
  FileText,
  Home,
  LogOut,
  Phone,
  Search,
  ShoppingCart,
  User,
  UserIcon,
  UserStar,
} from "lucide-react";
import { CartCanvas } from "./CartCanvas";
import { MobileHeader } from "./MobileHeader";
import { useToast } from "@/src/context/toast-context";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UserType } from "@/src/lib/types/user.type";
import { SearchBox } from "./SearchBox";
import NavBottomHeader from "./NavBottomHeader";

const Header = ({ isLoggedIn }: { isLoggedIn: UserType }) => {
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

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isSticky ? "fixed top-0 left-0 w-full z-50" : "fixed top-0 left-0 right-0"} z-50 shadow-sm bg-secondary border-b border-grey220`}
    >
      {/* header desktop */}
      <Container>
        <div className=" py-2.5 flex flex-col gap-2.5">
          {/* top */}
          <div className="flex items-center justify-between">
            <MobileHeader user={isLoggedIn} />
            <div className="lg:block hidden">
              <SearchBox />
            </div>

            <Link
              href={"/"}
              className="max-w-30 lg:max-w-37.5  lg:block hidden"
            >
              <Image
                src={"/images/logo.png"}
                width={600}
                height={300}
                alt="logo"
              />
            </Link>
            {/* logo-mobile */}
            <Link href={"/"} className=" lg:hidden block">
              <Image
                src={"/images/logo.png"}
                width={600}
                height={300}
                className="w-20 h-12"
                alt="logo"
              />
            </Link>
            {/* Buttons */}
            <div className="flex gap-2">
              {isLoggedIn ? (
                isLoggedIn.role === "ADMIN" ? (
                  <div className="relative group hidden lg:block">
                    <Link
                      href={"/admin"}
                      className="flex text-sm cursor-pointer items-center gap-1 p-2 justify-center rounded-full bg-white text-primary hover:text-white border border-grey220 hover:bg-primary transition-colors"
                    >
                      <UserStar className="size-4" />
                      <span className="lg:block hidden text-nowrap">
                        {" "}
                        پنل مدیریت
                      </span>
                    </Link>
                    <div className="absolute left-1/2 -translate-x-1/2  w-48 bg-secondary rounded-md shadow-lg border border-grey220 z-50 mt-20 invisible opacity-0 group-hover:opacity-100 group-hover:mt-2 group-hover:visible transition-all duration-500  ">
                      <div className="py-1  backdrop-blur-3xl">
                        <Link
                          className="flex items-center justify-between px-4 py-2 text-sm text-black hover:bg-primary/10"
                          href="/admin"
                          data-discover="true"
                        >
                          <div className="flex gap-1 items-center">
                            <Image
                              src={
                                isLoggedIn.image
                                  ? isLoggedIn.image
                                  : "/images/user.png"
                              }
                              className="size-8 bg-transparent rounded-full"
                              width={100}
                              height={100}
                              alt="user image"
                            />
                            {isLoggedIn.username}
                          </div>
                          <ChevronLeft size={16} />
                        </Link>
                        <hr />
                        <Link
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10"
                          href="/admin/products"
                          data-discover="true"
                        >
                          مدیریت محصولات
                        </Link>
                        <Link
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10"
                          href="/admin/users"
                          data-discover="true"
                        >
                          مدیریت کاربران
                        </Link>
                        <Link
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10"
                          href="/admin/comments"
                          data-discover="true"
                        >
                          مدیریت کامنت ها
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm  hover:bg-primary/10 hover:text-error500 cursor-pointer"
                        >
                          <LogOut className="size-4" />
                          خروج از حساب کاربری
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group hidden lg:block">
                    <Link
                      href={"/dashboard"}
                      className="flex text-sm cursor-pointer items-center gap-1 p-2 justify-center rounded-full bg-white text-primary hover:text-white border border-grey220 hover:bg-primary transition-colors"
                    >
                      <UserIcon className="size-4" />
                      <span className="lg:block hidden text-nowrap">
                        {" "}
                        ورود به حساب کاربری
                      </span>
                    </Link>
                    <div className="absolute right-0  w-48 bg-secondary rounded-md shadow-lg border border-grey220 z-50 mt-20 invisible opacity-0 group-hover:opacity-100 group-hover:mt-2 group-hover:visible transition-all duration-500  ">
                      <div className="py-1 font-Vazir-L backdrop-blur-3xl">
                        <Link
                          className="flex items-center justify-between px-4 py-2 text-sm text-black hover:bg-primary/10"
                          href="/dashboard"
                          data-discover="true"
                        >
                          <div className="flex gap-1 items-center">
                            <Image
                              src={
                                isLoggedIn.image
                                  ? isLoggedIn.image
                                  : "/images/user.png"
                              }
                              className="size-8 bg-transparent rounded-full"
                              width={100}
                              height={100}
                              alt="user image"
                            />
                            {isLoggedIn.username}
                          </div>
                          <ChevronLeft size={16} />
                        </Link>
                        <hr />
                        <Link
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10"
                          href="/dashboard/order"
                          data-discover="true"
                        >
                          سفارش‌ ها
                        </Link>
                        <Link
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10"
                          href="/dashboard/profile"
                          data-discover="true"
                        >
                          پیگیری سفارش
                        </Link>
                        <Link
                          className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10"
                          href="/dashboard/profile"
                          data-discover="true"
                        >
                          تیکت ها
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm  hover:bg-primary/10 hover:text-error500 cursor-pointer"
                        >
                          <LogOut className="size-4" />
                          خروج از حساب کاربری
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <Link
                    href={"/login"}
                    className="bg-primary text-white border border-grey220 rounded-3xl px-2 h-10 hidden lg:flex items-center justify-center"
                  >
                    ورود/ثبت‌نام
                  </Link>
                </>
              )}
              {/* not login */}
              <div className="block lg:hidden">
                <SearchBox />
              </div>
              {/*start Shoping-Crat */}
              <CartCanvas />
              {/*end Shoping-Crat */}
            </div>
          </div>

          {/* bottom */}
          <NavBottomHeader isSticky={isSticky} />
        </div>
      </Container>
    </header>
  );
};

export default Header;

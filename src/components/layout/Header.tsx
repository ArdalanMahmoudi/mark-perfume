'use client'
import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  BookText,
  CircleQuestionMark,
  FileText,
  Home,
  LogOut,
  Phone,
  Search,
  ShoppingCart,
  User,
  UserIcon,
} from "lucide-react";
import { CiInstagram } from "react-icons/ci";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import { CartCanvas } from "./CartCanvas";
import ActiveLink from "../common/ActiveLink";
import Megamenu from "./Megamenu";
import { MobileHeader } from "./MobileHeader";
import { useToast } from "@/src/app/ToastProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
enum Role {
  ADMIN,
  USER,
}
type UserProp = {
  id: string;
  username: string;
  email: string;
  role: Role;
  image?: string;
};
const Header = ({ isLoggedIn }: { isLoggedIn: UserProp  }) => {
  const toast = useToast();
  const router = useRouter();
  const handleLogout = async () => {
    Swal.fire({
      title: "آیا میخواهید از حسابتان خارج شوید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton:true,
      customClass: {
        confirmButton: "bg-primary! text-white!",
      },
    }).then(async(res) => {
      if (res.isConfirmed) {
        const result = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (!result.ok) {
          toast.error("مشکلی پیش آمد مجدد امتحان کنید");
          return;
        }
        router.refresh();
      }
    });
  };
  return (
    <header className="bg-secondary border-b border-grey220">
      {/* header desktop */}
      <Container>
        <div className="py-2.5 flex flex-col gap-2.5">
          {/* top */}
          <div className="flex items-center justify-between">
            {/* Mobile-Header */}
            <MobileHeader />
            {/* Mobile-Header */}
            <div className="flex items-center lg:gap-24  justify-between">
              <form
                action="#"
                className="h-10 rounded-3xl bg-white border border-grey220 border-l-0 lg:w-md  hidden lg:flex items-center"
              >
                <input
                  type="text"
                  className="focus:outline-0 px-2.5 w-full text-sm"
                  placeholder="اینجا پیداش کن ...."
                />
                <button className="bg-secondary rounded-l-3xl size-10 border border-grey220 flex items-center justify-center">
                  <Search className="text-primary size-5" />
                </button>
              </form>
              <Link href={"/"} className="max-w-30 lg:max-w-37.5 max-h-20">
                <Image
                  src={"/images/logo.png"}
                  width={600}
                  height={300}
                  alt="logo"
                />
              </Link>
            </div>
            {/* Buttons */}
            <div className="flex gap-2">
              {isLoggedIn ? (
                <div className="relative group ">
                  <button className="flex text-sm cursor-pointer items-center gap-1 p-2 rounded-full bg-white text-primary hover:text-white border border-grey220 hover:bg-primary transition-colors">
                    <UserIcon className="size-6" />
                    ورود به حساب کاربری
                  </button>
                  <div className="absolute right-0  w-48 bg-secondary rounded-md shadow-lg border border-grey220 z-50 mt-20 invisible opacity-0 group-hover:opacity-100 group-hover:mt-2 group-hover:visible transition-all duration-500  ">
                    <div className="py-1 font-Vazir-L backdrop-blur-3xl">
                      <Link
                        className="flex items-center gap-1 px-4 py-2 text-sm text-black hover:bg-primary/10"
                        href="/dashboard"
                        data-discover="true"
                      >
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

                      {/* <Link className="block px-4 py-2 text-sm text-charcoal hover:bg-primary/10" href="/dashboard#/admin" data-discover="true">پنل مدیریت</Link> */}
                      <button onClick={handleLogout} className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm  hover:bg-primary/10 hover:text-error500 cursor-pointer">
                        <LogOut className="size-4" />
                        خروج از حساب کاربری
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href={"/login"}
                    className="bg-primary text-white border border-grey220 rounded-3xl px-2 h-10 hidden lg:flex items-center justify-center"
                  >
                    ورود/ثبت‌نام
                  </Link>
                  <Link
                    href={"/login"}
                    className="flex lg:hidden items-center justify-center bg-white border border-e-grey220 relative capitalize group transition-all duration-200 cursor-pointer text-primary hover:bg-primary hover:text-white size-9 lg:size-10 rounded-full"
                  >
                    <User className="size-4" />
                  </Link>
                </>
              )}
              {/* not login */}

              {/*start Shoping-Crat */}
              <CartCanvas />
              {/*end Shoping-Crat */}
            </div>
          </div>

          {/* bottom */}
          <div className="hidden lg:flex items-center justify-between">
            <nav className="flex gap-4 text-sm">
              {/* Mega-menu */}
              <Megamenu />
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/"}
              >
                <Home className="size-4.5 text-primary" />
                <span>خانه</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/shop"}
              >
                <ShoppingCart className="size-4.5 text-primary" />
                <span>فروشگاه</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/blogs"}
              >
                <FileText className="size-4.5 text-primary" />
                <span>مقالات</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/rules"}
              >
                <BookText className="size-4.5 text-primary" />
                <span>قوانین و شرایط خرید</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/contactus"}
              >
                <Phone className="size-4.5 text-primary" />
                <span>تماس با ما</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/aboutus"}
              >
                <CircleQuestionMark className="size-4.5 text-primary" />
                <span>درباره ما</span>
              </ActiveLink>
            </nav>
            {/* Social link */}
            <div className="flex items-center gap-4">
              <Link
                href={"/"}
                className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"
              >
                <CiInstagram className="size-5 text-primary" />
              </Link>
              <Link
                href={"/"}
                className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"
              >
                <PiWhatsappLogoThin className="size-5 text-primary" />
              </Link>
              <Link
                href={"/"}
                className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"
              >
                <CiLinkedin className="size-5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

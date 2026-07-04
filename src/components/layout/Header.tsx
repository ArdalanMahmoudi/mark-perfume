import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { BookText, CircleQuestionMark, FileText, Home, Phone, Search, ShoppingCart, User } from "lucide-react";
import { CiInstagram } from "react-icons/ci";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import { CartCanvas } from "./CartCanvas";
import ActiveLink from "../common/ActiveLink";
import Megamenu from "./Megamenu";
import { MobileHeader } from "./MobileHeader";

const Header = () => {
  return (
    <header className="bg-secondary border-b border-grey220">
      {/* header desktop */}
      <Container>
        <div className="py-2.5 flex flex-col gap-2.5">
          {/* top */}
          <div className="flex items-center justify-between">
            {/* Mobile-Header */}
            <MobileHeader/>
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
              {/* not login */}
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
               <User className="size-4"/>
              </Link>
              {/* Shoping-Crat */}
              <CartCanvas />
              {/* Shoping-Crat */}
            </div>
          </div>

          {/* bottom */}
          <div className="hidden lg:flex items-center justify-between">
            <nav className="flex gap-4 text-sm">
              {/* Mega-menu */}
              <Megamenu/>
              <ActiveLink activeClassName="border-b-2 border-primary" className="  p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 " href={"/"}>
                <Home className="size-4.5 text-primary" />
                <span>خانه</span>
              </ActiveLink>
              <ActiveLink activeClassName="border-b-2 border-primary" className="  p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 " href={"/shop"}>
                <ShoppingCart className="size-4.5 text-primary" />
                <span>فروشگاه</span>
              </ActiveLink>
              <ActiveLink activeClassName="border-b-2 border-primary" className="  p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 " href={"/blogs"}>
                <FileText className="size-4.5 text-primary" />
                <span>مقالات</span>
              </ActiveLink>
              <ActiveLink activeClassName="border-b-2 border-primary" className="  p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 " href={"/rules"}>
                <BookText className="size-4.5 text-primary" />
                <span>قوانین و شرایط خرید</span>
              </ActiveLink>
              <ActiveLink activeClassName="border-b-2 border-primary" className="  p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 " href={"/contactus"}>
                <Phone className="size-4.5 text-primary" />
                <span>تماس با ما</span>
              </ActiveLink>
              <ActiveLink activeClassName="border-b-2 border-primary" className="  p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 " href={"/aboutus"}>
                <CircleQuestionMark className="size-4.5 text-primary" />
                <span>درباره ما</span>
              </ActiveLink>
            </nav>
            {/* Social link */}
            <div className="flex items-center gap-4">
              <Link href={'/'} className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"><CiInstagram className="size-5 text-primary"/></Link>
              <Link href={'/'} className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"><PiWhatsappLogoThin className="size-5 text-primary"/></Link>
              <Link href={'/'} className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"><CiLinkedin className="size-5 text-primary"/></Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

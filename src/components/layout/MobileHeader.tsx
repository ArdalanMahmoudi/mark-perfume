import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { ChevronLeft, Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileHeaderTabs from "./MobileHeaderTabs";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { UserType } from "@/src/lib/types/user.type";

export function MobileHeader({ user }:{user:UserType}) {
  return (
    <div className="flex flex-wrap lg:hidden gap-2">
      <Drawer direction={"right"}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="relative capitalize group transition-all duration-200 cursor-pointer text-primary hover:bg-primary hover:text-white size-8 lg:size-10 rounded-full"
          >
            <Menu className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-none! gap-5 data-[vaul-drawer-direction=bottom]:max-h-[50vh] w-[90%]! data-[vaul-drawer-direction=top]:max-h-[50vh]  pt-0 bg-secondary">
          <DrawerHeader className="p-0 w-full">
            {/* Profile */}
            <div className="flex items-center justify-between h-20 bg-sidebar-primary-foreground px-5">
              {user ? (
                <>
                  <div className="flex items-center gap-x-2.5">
                    <Image
                      src={"/images"}
                      width={32}
                      height={32}
                      className="size-12 object-cover rounded-full border border-grey220"
                      alt="profile image"
                    />
                    <div className="flex flex-col">
                      <span className="line-clamp-1">{user.username}</span>
                      <span className="text-sm  text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <Link href={`${user.role === "ADMIN" ? '/admin' : '/dashboard'}`} target="_blank">
                    <ChevronLeft size={20} />
                  </Link>
                </>
              ) : (
                <span className="text-lg font-bold">ورود | ثبت نام</span>
              )}
            </div>
            {/* ------- */}
          </DrawerHeader>
          <MobileHeaderTabs />
          <DrawerFooter className=" flex flex-col gap-2.5  px-2">
            <div className="flex items-center gap-4 justify-center">
              <Link
                href={"/"}
                className="size-8 bg-white flex items-center justify-center border border-grey220 rounded-full hover:bg-primary text-primary hover:text-white transition-all duration-300"
              >
                <CiInstagram className="size-5" />
              </Link>
              <Link
                href={"/"}
                className="size-8 bg-white flex items-center justify-center border border-grey220 rounded-full hover:bg-primary text-primary hover:text-white transition-all duration-300"
              >
                <PiWhatsappLogoThin className="size-5" />
              </Link>
              <Link
                href={"/"}
                className="size-8 bg-white flex items-center justify-center border border-grey220 rounded-full hover:bg-primary text-primary hover:text-white transition-all duration-300"
              >
                <CiLinkedin className="size-5" />
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

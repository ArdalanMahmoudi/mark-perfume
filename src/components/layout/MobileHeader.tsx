import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { Menu, Minus, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileHeaderTabs from "./MobileHeaderTabs";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { PiWhatsappLogoThin } from "react-icons/pi";
import { SearchBox } from "./SearchBox";

export function MobileHeader() {
  return (
    <div className="flex flex-wrap lg:hidden gap-2">
      <Drawer direction={"right"}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="relative capitalize group transition-all duration-200 cursor-pointer text-primary hover:bg-primary hover:text-white size-9 lg:size-10 rounded-full"
          >
            <Menu className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-none! gap-5 data-[vaul-drawer-direction=bottom]:max-h-[50vh] w-[90%]! data-[vaul-drawer-direction=top]:max-h-[50vh] p-5 bg-secondary">
          <DrawerHeader className="p-0 w-full">
           <SearchBox/>
          </DrawerHeader>
          <MobileHeaderTabs/>
          <DrawerFooter className="pt-2.5 flex flex-col gap-2.5  ">
             <div className="flex items-center gap-4 justify-center">
              <Link href={'/'} className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full hover:bg-primary text-primary hover:text-white transition-all duration-300"><CiInstagram className="size-5"/></Link>
              <Link href={'/'} className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full hover:bg-primary text-primary hover:text-white transition-all duration-300"><PiWhatsappLogoThin className="size-5"/></Link>
              <Link href={'/'} className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full hover:bg-primary text-primary hover:text-white transition-all duration-300"><CiLinkedin className="size-5"/></Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

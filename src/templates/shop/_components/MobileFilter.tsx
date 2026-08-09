// import { FilterIcon } from "lucide-react";
// import React from "react";

// const MobileFilter = () => {
//   return (
//
//   );
// };

// export default MobileFilter;
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
import { FilterIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarFilter from "./SidebarFilter";
import { SliderRange } from "./SliderRange";

export function MobileFilter() {
  return (

      <Drawer  direction={"bottom"}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="bg-white border lg:hidden border-primary text-black flex gap-1 items-center justify-center fixed bottom-5 right-5 w-15 h-15 z-10 cursor-pointer rounded-full shadow-lg"
          >
            <span>فیلتر</span>
            <FilterIcon className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-none! data-[vaul-drawer-direction=bottom]:max-h-[65vh] w-full! data-[vaul-drawer-direction=top]:max-h-[65vh]  p-3 bg-secondary">
         <div className="text-primary text-center py-4 pt-0 font-bold">فیلترها</div>
          <div className="flex flex-col gap-5 sticky top-8 overflow-y-auto">
            <SidebarFilter title="دسته بندی ها">
              <div className="flex items-center gap-1 w-fit ">
                <input type="checkbox" name="" id="" />
                <label htmlFor="#">Chanel</label>
              </div>
              <div className="flex items-center gap-1 w-fit ">
                <input type="checkbox" name="" id="" />
                <label htmlFor="#">Dior</label>
              </div>
              <div className="flex items-center gap-1 w-fit ">
                <input type="checkbox" name="" id="" />
                <label htmlFor="#">Calvin klein</label>
              </div>
              <div className="flex items-center gap-1 w-fit ">
                <input type="checkbox" name="" id="" />
                <label htmlFor="#">Versace</label>
              </div>
            </SidebarFilter>
            <SidebarFilter title="قیمت">
              <SliderRange />
            </SidebarFilter>
            <SidebarFilter title="جنسیت">
              <div className="flex items-center gap-1 w-fit ">
                <input type="radio" name="gender" value="male" />
                <label htmlFor="#">مردانه</label>
              </div>
              <div className="flex items-center gap-1 w-fit ">
                <input type="radio" name="gender" value="female" />
                <label htmlFor="#">زنانه</label>
              </div>
              <div className="flex items-center gap-1 w-fit ">
                <input type="radio" name="gender" value="male-female" />
                <label htmlFor="#">مردانه-زنانه</label>
              </div>
            </SidebarFilter>
          </div>
        </DrawerContent>
      </Drawer>

  );
}

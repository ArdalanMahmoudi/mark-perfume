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
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartCanvas() {
  return (
    <div className="flex flex-wrap gap-2">
      <Drawer direction={"left"}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="relative capitalize group transition-all duration-200 cursor-pointer text-primary hover:bg-primary hover:text-white size-9 lg:size-10 rounded-full"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-none! data-[vaul-drawer-direction=bottom]:max-h-[50vh] w-[90%]! data-[vaul-drawer-direction=top]:max-h-[50vh] p-3 bg-secondary">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center mb-3">
              <span className="text-sm">
                سبد خرید ({Number(2).toLocaleString("fa-IR")} مورد)
              </span>
              <DrawerClose className="size-5 text-black" ><X className="size-5"/></DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3.5 h-full overflow-y-auto">
            {/* item */}
            {Array.from({ length: 2 }).map((_, index) => (
              <>
                <hr className="h-px border border-primary w-full" />
                <div className="grid grid-cols-[80px_1fr]  gap-2.5 p-2">
                  <Image
                    src={"/images/product/product 1.jpg"}
                    className="w-full rounded-full"
                    width={500}
                    height={500}
                    alt="product cart"
                  />
                  <div className="flex flex-col justify-between gap-3.5 w-full">
                    {/* title */}
                    <p className="text-xs line-clamp-3 leading-5">
                      عطر مردانه Midnight Rush با پراکندگی قوی ۱۰۰ میلی‌لیتر
                    </p>
                    <div className="grid grid-cols-2 items-center justify-between ">
                      {/* count */}
                      <div className="bg-white w-fit border border-grey220 p-1 rounded-4xl flex justify-between items-center text-sm gap-1">
                        {" "}
                        <Plus className="size-3 cursor-pointer" />
                        <span>{(2).toLocaleString("fa-IR")}</span>
                        <Minus className="size-3 cursor-pointer" />
                      </div>
                      {/* price */}
                      <div className="flex flex-col items-end text-xs gap-0.5">
                        <span className="text-grey100 line-through">
                          {(4_600_000).toLocaleString("fa-IR")} تومان
                        </span>
                        <span className="font-bold">
                          {(4_300_000).toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <DrawerFooter className="pt-2.5 flex flex-col gap-2.5 border-t-2 border-primary ">
            <p className="bg-white rounded-4xl border border-grey220 text-center text-sm py-1 px-2 text-primary">
              مبلغ قابل پرداخت = {(20_000_000).toLocaleString("fa-IR")}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                className="bg-white  rounded-4xl border border-grey220 text-center text-xs py-1  px-2 text-primary "
                href={"/payment"}
              >
                ثبت سفارش
              </Link>
              <Link
                className="bg-white  rounded-4xl border border-grey220 text-center text-xs py-1  px-2 text-primary "
                href={"/cart"}
              >
                مشاهده سبد خرید
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

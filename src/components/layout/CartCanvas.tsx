"use client";
import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { calculatedDiscountedPrice } from "@/src/lib/helper";
import { useCartStore } from "@/src/stores/cart-store";

import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartCanvas() {

  const cart = useCartStore((state) => state.cart)
  const totalPrice = useCartStore((state) => state.totalPrice)
  return (
    <Drawer direction={"left"}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="relative capitalize group transition-all duration-200 cursor-pointer text-primary hover:bg-primary hover:text-white size-8 lg:size-10 rounded-full"
        >
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs group-hover:bg-white group-hover:text-primary transition-all duration-300 rounded-full size-4.5 border border-grey220">
              {cart.length.toLocaleString("fa-IR")}
            </span>
          )}
          <ShoppingCart className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none! data-[vaul-drawer-direction=bottom]:max-h-[50vh] w-[90%]! data-[vaul-drawer-direction=top]:max-h-[50vh] p-3 bg-secondary">
        <DrawerHeader>
          <DrawerTitle className="flex justify-between items-center mb-3">
            <span className="text-sm">
              سبد خرید ({cart.length.toLocaleString("fa-IR")} مورد)
            </span>
            <DrawerClose className="size-5 text-black">
              <X className="size-5" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col gap-3.5 h-full overflow-y-auto">
              {/* item */}
              {cart.map((product, index) => (
                <>
                  <hr className="h-px border border-primary w-full" />
                  <div className="grid grid-cols-[80px_1fr]  gap-2.5 p-2">
                    <Image
                      src={product.thumbnail}
                      className="w-full rounded-full"
                      width={500}
                      height={500}
                      alt="product cart"
                    />
                    <div className="flex flex-col justify-between gap-3.5 w-full">
                      <p className="text-xs line-clamp-2 leading-5">
                        {product.name}
                      </p>
                      <div className="grid grid-cols-2 items-center justify-between ">
                        <div className="bg-white w-fit border border-grey220 p-1 rounded-4xl flex justify-between items-center text-sm gap-1">
                          {" "}
                          <Plus className="size-3 cursor-pointer" />
                          <span>{product.qty.toLocaleString("fa-IR")}</span>
                          <Minus className="size-3 cursor-pointer" />
                        </div>

                        {product.discount > 0 ? (
                          <div className="flex flex-col items-end text-xs gap-0.5">
                            <span className="text-grey100 line-through">
                              {product.price.toLocaleString("fa-IR")} تومان
                            </span>
                            <span className="font-bold">
                              {calculatedDiscountedPrice({
                                price: product.price,
                                discount: product.discount,
                              }).toLocaleString("fa-IR")}{" "}
                              تومان
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-end text-xs gap-0.5">
                            <span className="font-bold">
                              {product.price.toLocaleString("fa-IR")} تومان
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <DrawerFooter className="pt-2.5 flex flex-col gap-2.5 border-t-2 border-primary ">
              <p className="bg-white rounded-4xl border border-grey220 text-center text-sm py-1 px-2 text-primary">
                مبلغ قابل پرداخت = {totalPrice().toLocaleString("fa-IR")}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  className="w-full rounded-4xl bg-white border border-grey220 text-center text-xs py-1  px-2 text-primary "
                  href={"/payment"}
                >
                  <DrawerClose className="w-full h-full cursor-pointer">
                    ثبت سفارش
                  </DrawerClose>
                </Link>
                <Link
                  className="w-full rounded-4xl bg-white border border-grey220 text-center text-xs py-1  px-2 text-primary "
                  href={"/cart"}
                >
                  <DrawerClose className="w-full h-full cursor-pointer">
                    مشاهده سبد خرید
                  </DrawerClose>
                </Link>
              </div>
            </DrawerFooter>
          </>
        ) : (
          <div className="flex gap-5 flex-col w-full p-8 items-center">
            <Image
              src={"/images/empty-cart.svg"}
              width={200}
              height={150}
              className=""
              alt="empty cart"
            />
            <p className="text-primary leading-8 font-bold">
              سبد خرید خالیه  !
            </p>
            <Link href={"/shop"}>
            <DrawerClose className="text-sm px-6 bg-primary py-1 rounded-sm text-white cursor-pointer">
رفتن به فروشگاه
            {/* <Button variant={"outline"} className=""></Button> */}
            </DrawerClose>
          </Link>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

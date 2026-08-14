"use client";
import Container from "@/src/components/common/Container";
import React from "react";
import CheckoutStepper from "./CheckoutStepper";
import Image from "next/image";
import { CheckCheck, Plus, ShoppingBag, Trash, Truck } from "lucide-react";
import CartItem from "./CartItem";
import { useCart } from "@/src/context/cart-context";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import CheckOutSidebar from "@/src/components/common/CheckOutSidebar";

const CartPageTemplate = () => {
  const { cart, removeProductInCart } = useCart();
  return cart.length ? (
    <>
      <section className="pt-6">
        <Container>
          <CheckoutStepper currentStep={0} />
        </Container>
      </section>
      <section>
        <Container>
          <div className="grid grid-cols-[1fr_300px] gap-7.5 mb-12 relative">
            {/* ============right========== */}
            <div className="flex flex-col gap-5">
              {/* title */}
              <div className="flex justify-between items-center border-b border-b-primary">
                <p className="font-bold leading-7">سبد خرید شما</p>
                <p className="text-sm">
                  {cart.length && cart.length.toLocaleString("fa-IR") }
                  <span className="pr-0.5">کالا</span>
                </p>
              </div>
              {/* ============Product-layout========== */}
              {/* item */}

              <div className="flex flex-col gap-8">
                {cart.map((item) => (
                  <CartItem
                    product={item}
                    removeProduct={removeProductInCart}
                  />
                ))}
              </div>
            </div>
            {/* ========left========== */}
            <CheckOutSidebar/>
          </div>
        </Container>
      </section>
    </>
  ) : (
    <section className="pt-6">
      <Container>
        <div className="bg-secondary-layout items-center">
          <Image
            src={"/images/empty-cart.svg"}
            width={200}
            height={150}
            className=""
            alt="empty cart"
          />
          <div className="flex flex-col items-center">
            <p className="text-primary leading-8 font-bold">
              سبد خریدت خالیه  !
            </p>
            <p className="leading-8 text-sm">
              سبد خرید شما در حال حاضر خالی است. در صورت تمایل، می‌ توانید برای
              مشاهده محصولات و افزودن آنها به سبد خرید خود، روی دکمه زیر کلیک
              کنید.{" "}
            </p>
          </div>

          <Link href={"/shop"}>
            <Button variant={"outline"} className="text-base px-6 bg-primary text-white cursor-pointer">رفتن به فروشگاه</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CartPageTemplate;

"use client";
import Container from "@/src/components/common/Container";
import CheckoutStepper from "./_components/CheckoutStepper";
import Image from "next/image";
import CartItem from "./_components/CartItem";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import CheckOutSidebar from "@/src/components/common/CheckOutSidebar";
import { useCartStore } from "@/src/stores/cart-store";

const CartPageTemplate = () => {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  
  return cart.length ? (
    <>
      <section className="pt-6">
        <Container>
          <CheckoutStepper currentStep={0} />
        </Container>
      </section>
      <section>
        <Container>
          <div className="grid grid-cols-[repeat(1,100%)] lg:grid-cols-[1fr_300px] gap-7.5 mb-12 relative">
            {/* ============right========== */}
            <div className="flex flex-col gap-5">
              {/* title */}
              <div className="flex justify-between items-center border-b border-b-primary">
                <p className="font-bold leading-7 text-sm lg:text-base">سبد خرید شما</p>
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
                  key={item.id}
                    product={item}
                    removeProduct={() => removeFromCart(item.id)}
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

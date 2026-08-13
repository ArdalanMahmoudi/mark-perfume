import Container from "@/src/components/common/Container";
import React from "react";
import CheckoutStepper from "../cart/CheckoutStepper";
import { CreditCard, RocketIcon, Wallet } from "lucide-react";
import CheckOutSidebar from "@/src/components/common/CheckOutSidebar";

const PaymentTemplate = () => {
  return (
    <>
      <section className="pt-6">
        <Container>
          <CheckoutStepper currentStep={2} />
        </Container>
      </section>
      <section>
        <Container>
          <div className="my-12 gap-8 grid lg:grid-cols-[1fr_300px]">
            {/* right */}
            <div className="flex flex-col gap-5">
              {/* layout */}
              <div className="bg-secondary-layout">
                {/* title */}
                <p className="text-primary">انتخاب روش پرداخت</p>
                {/* card */}
                <div className="w-full grid grid-cols-[1fr_auto] gap-5 justify-between items-center bg-white p-5  rounded-sm">
                  <div className="flex gap-1 items-center">
                    <input
                      checked
                      type="radio"
                      name="pay-method"
                      id="bank-card"
                    />
                    <label
                      htmlFor="bank-card"
                      className="leading-8 flex gap-1 items-center"
                    >
                      <CreditCard size={18} />
                      کارت بانکی
                    </label>
                  </div>
                  <p>۲۰,۰۰۰,۰۰۰ تومان</p>
                </div>
                {/* card */}
                <div className="w-full grid grid-cols-[1fr_auto] gap-5 justify-between items-center bg-white p-5  rounded-sm">
                  <div className="flex gap-1 items-center">
                    <input type="radio" name="pay-method" id="bank-card" />
                    <label
                      htmlFor="bank-card"
                      className="leading-8 flex gap-1 items-center"
                    >
                      <Wallet size={18} />
                      کیف پول
                    </label>
                  </div>
                  <p>۲۰,۰۰۰,۰۰۰ تومان</p>
                </div>
              </div>
              {/* Discount Code Layout  */}
              <div className="bg-secondary-layout">
                <p>کد هدیه</p>
                <div className="w-full grid grid-cols-[1fr_auto] justify-between items-center rounded-2xl overflow-hidden bg-white h-10 border border-grey220 pr-4">
                  <input
                    className="h-full text-sm outline-0"
                    placeholder="اگر کد هدیه دارید وارد کنید."
                    type="text"
                    name=""
                    id=""
                  />
                  <button className="h-full bg-primary text-white  rounded-3xl px-6  transition-all duration-300 border border-grey220 hover:bg-white hover:text-primary">
                    {" "}
                    ثبت
                  </button>
                </div>
              </div>
              {/*  Order Detail Layout  */}
              <div className="bg-secondary-layout">
                <p className="text-primary ">خلاصه سفارش </p>
                <div className="grid grid-cols-[1fr_auto] text-sm p-5 rounded-md bg-white">
                  <div className="flex items-center gap-1">
                    <RocketIcon size={14} />
                    شنبه ۱۵ فروردین - بازه ۱۰ - ۱۱
                  </div>
                  <p>ارسال ویژه - ۳۹,۰۰۰ تومان</p>
                </div>
              </div>
            </div>
            {/* left */}
            <CheckOutSidebar/>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PaymentTemplate;

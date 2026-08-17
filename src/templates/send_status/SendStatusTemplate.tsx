"use client"
import Container from "@/src/components/common/Container";
import React from "react";
import CheckoutStepper from "../cart/CheckoutStepper";
import Link from "next/link";
import { ChevronsLeftIcon, Clock, MapPin, Truck } from "lucide-react";
import { useCart } from "@/src/context/cart-context";
import CheckOutSidebar from "@/src/components/common/CheckOutSidebar";

const SendStatusTemplate = () => {
  const date = [
      { id: 1, day: "۲۳", week: "شنبه" },
      { id: 2, day: "۲۴", week: "یک شنبه" },
      { id: 3, day: "۲۵", week: "دوشنبه" },
    { id: 4, day: "۲۶", week: "سه شنبه" },
    { id: 5, day: "۲۷", week: "چهار شنبه" },
    { id: 6, day: "۲۸", week: "پنج شنبه" },
  ];
  return (
    <>
      <section className="pt-6">
        <Container>
          <CheckoutStepper currentStep={1} />
        </Container>
      </section>
      <section>
        <Container>
          <div className="my-12 gap-8 grid lg:grid-cols-[1fr_300px]">
            {/* right */}
            <div className="flex flex-col gap-5">
              {/* addres */}
              <div className="bg-secondary rounded-md p-5 border border-grey220 grid lg:grid-cols-[1fr_auto] gap-5 items-center">
                <div className="flex flex-col gap-3.5">
                  <Link
                    className="text-primary text-sm w-fit"
                    href={"/send_status"}
                  >
                    آدرس تحویل سفارش
                  </Link>
                  <div className="flex gap-1 items-center">
                    <MapPin size={14} />
                    <p className="leading-8 text-sm lg:text-base">
                      تهران، خیابان ولی‌عصر، پلاک ۱، واحد ۲
                    </p>
                  </div>
                  <p className="leading-8 text-sm lg:text-base">اردلان محمودی</p>
                </div>
                <Link
                  href={"/send_status"}
                  className="flex gap-1 items-center text-primary text-sm"
                >
                  <p>تغییر | ویرایش</p>
                  <ChevronsLeftIcon size={14} />
                </Link>
              </div>
              {/* date */}
              <div className="flex flex-col gap-5 bg-secondary rounded-sm border border-grey220 p-5">
                <div className="bg-white p-5 rounded-md w-full">
                  {/* title */}
                  <div className="flex justify-between items-center text-sm  pb-1">
                    <div className="flex gap-1 items-center">
                      <Truck size={14} />
                      <p>ارسال عادی</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock size={14} />
                      <p>انتخاب زمان ارسال </p>
                    </div>
                  </div>
                  {/* time */}
                  <div className="flex flex-col gap-1 items-center mt-8 p-5 border border-grey220 rounded-md">
                    {/*  */}
                    <div className="flex w-full justify-evenly items-center border-b border-b-grey220 pb-2.5 flex-wrap gap-5">
                      {/* item */}
                      {date.map((item) => (
                        <div
                          key={item.id}
                          className={`flex border-b-2 ${item.id === 3 ? "border-primary" : "border-white"} flex-col items-center gap-2.5 text-sm `}
                        >
                          <p>{item.week}</p>
                          <p>{item.day}</p>
                        </div>
                      ))}
                    </div>
                    {/*  */}
                    <div className="w-full py-5 flex justify-evenly items-center flex-wrap gap-3.5">
                        <div className="flex items-center gap-1 text-sm ">
                            <input type="radio"  name="send-time-usual" id="9to12" checked/>
                            <label htmlFor="9to12">ساعت ۹ تا ۱۲</label>
                        </div>
                        <div className="flex items-center gap-1 text-sm ">
                            <input type="radio" name="send-time-usual" id="13to16" />
                            <label htmlFor="13to16">ساعت ۱۳ تا ۱۶</label>
                        </div>
                        <div className="flex items-center gap-1 text-sm ">
                            <input type="radio" name="send-time-usual" id="17to20" />
                            <label htmlFor="17to20">ساعت ۱۷ تا ۲۰</label>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {/* ========left========== */}
            <CheckOutSidebar/>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SendStatusTemplate;

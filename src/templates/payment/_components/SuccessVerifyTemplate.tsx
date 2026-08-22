import Container from "@/src/components/common/Container";
import { CheckCircle2, PackageIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SuccessVerifyTemplate = ({ refId, amount, paidAt }) => {
  return (
    <section>
      <Container>
        {/* success-payment-layout */}
        <div className="my-20 mx-auto p-8 rounded-lg max-w-200 flex flex-col items-center gap-5 bg-secondary border border-grey220">
          {/* Icon */}
          <CheckCircle2 className="size-19 rounded-full p-3.5 text-white border-2 border-white bg-success500 shadow-2xl shadow-success100" />
          {/* payment-title */}
          <div className="flex flex-col">
            <p className="lg:text-xl text-lg font-bold text-nowrap">
              پرداخت با موفقیت انجام شد !{" "}
            </p>
            <p className="text-xs text-success600 text-center mt-1 font-bold ">
              Order Confirmed Successfully
            </p>
          </div>
          {/*  Payment Details  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 justify-between w-full gap-6">
            {/* item-1 */}
            <div className="border border-grey220 bg-white rounded-sm flex flex-col gap-2.5 items-center p-5">
              <p className="text-sm text-grey100 font-bold">شماره پیگیری</p>
              <p className="text-primary font-bold">{refId}</p>
            </div>
            {/* item-1 */}
            <div className="border border-grey220 bg-white rounded-sm flex flex-col gap-2.5 items-center p-5">
              <p className="text-sm text-grey100 font-bold">تاریخ ثبت</p>
              <p className="text-primary font-bold">
                {paidAt.toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {/* item-1 */}
            <div className="border border-grey220 bg-white rounded-sm flex flex-col gap-2.5 items-center p-5">
              <p className="text-sm text-grey100 font-bold">مبلغ پرداختی</p>
              <p className="text-primary font-bold">{amount.toLocaleString("fa-IR")} تومان</p>
            </div>
          </div>
          {/* Send Product  */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-6 p-5 rounded-sm items-center bg-white border border-grey250">
            {/* right */}
            <div className="flex items-center gap-6">
              <PackageIcon className="text-primary size-12 lg:block hidden" />
              <div className="text-center lg:text-start">
                <p className="font-bold leading-8">آماده سازی برای ارسال</p>
                <p className="lg:text-sm text-xs">
                  بسته بندی شما طبق زمان‌بندی تحیل داده می‌شود
                </p>
              </div>
            </div>
            {/* left */}
            <Link
              href={"/payment"}
              className="text-sm hover:text-primary transition-colors duration-300 cursor-pointer font-bold"
            >
              مشاهده جزئیات سفارش{" "}
            </Link>
          </div>
          {/* Payment Btns  */}
          <div className="flex justify-center gap-3.5 items-center">
            <Link
              href={"/payment"}
              className="text-sm lg:px-6 px-4 text-nowrap py-2 rounded-4xl border border-grey220 bg-primary text-white hover:bg-white hover:text-primary duration-200 transition-all"
            >
              پیگیری سفارش
            </Link>
            <Link
              href={"/shop"}
              className="text-sm lg:px-6 px-4 text-nowrap py-2 rounded-4xl border border-grey220 text-primary bg-white hover:bg-primary hover:text-white duration-200 transition-all"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SuccessVerifyTemplate;

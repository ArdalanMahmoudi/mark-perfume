import Container from "@/src/components/common/Container";
import { FileWarningIcon, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const FailVerifyTemplate = ({refId}) => {
  return (
    <section>
      {/* fail-payment-template */}
      <Container>
        <div className="my-20 mx-auto p-8 rounded-lg max-w-200 flex flex-col items-center gap-5 bg-secondary border border-grey220">
          {/* icon */}
          <X className="size-19 rounded-full p-3.5 text-white border-2 border-white bg-error500 shadow-2xl shadow-error500" />
          {/* payment-title */}
          <div className="flex flex-col">
            <p className="text-xl font-bold">متاسفانه پرداخت انجام نشد !</p>
            <p className="text-xs text-success600 text-center mt-1 font-bold ">
              Transaction Failed Or Cancelled{" "}
            </p>
          </div>
          {/*  Failed Reason  */}
          <div className="w-full rounded-sm p-5 flex flex-col bg-secondary text-center ">
            <p className="font-bold leading-8">علت احتمالی خطا :</p>
            <p className="text-sm">
              موجودی کافی نیست یا تراکنش توسط مبدا بانک متوقف شده است . مبلغی از
              حساب شما کسر نشده اشت.
            </p>
          </div>
          {/* Payment Details */}
          <div className="grid grid-cols-3 justify-between w-full gap-6">
            {/* item-1 */}
            <div className="border border-grey220 bg-white rounded-sm flex flex-col gap-2.5 items-center p-5">
              <p className="text-sm text-grey100 font-bold">کد پیگیری تراکنش</p>
              <p className="text-primary font-bold">{refId}</p>
            </div>
            {/* item-2 */}
            <div className="border border-grey220 bg-white rounded-sm flex flex-col gap-2.5 items-center p-5">
              <p className="text-sm text-grey100 font-bold"> زمان وقوع خطا</p>
              <p className="text-primary font-bold">{new Date()}</p>
            </div>
          </div>
          {/*  Warning Layout  */}
          <div className="flex justify-center gap-1 text-sm">
            <FileWarningIcon className="text-error500" />
            <p>
              اگر مبلغی از حساب شما کسر شده حداکثر تا 72 ساعت آینده بر می‌گردد.
            </p>
          </div>
          {/* Payment Btns  */}
          <div className="flex justify-center gap-3.5 items-center">
            <Link
              href={"/payment"}
              className="text-sm px-6 py-2 rounded-4xl border border-grey220 bg-primary text-white hover:bg-white hover:text-primary duration-200 transition-all"
            >
            تلاش مجدد
            </Link>
            <Link
              href={"/shop"}
              className="text-sm px-6 py-2 rounded-4xl border border-grey220 text-primary bg-white hover:bg-primary hover:text-white duration-200 transition-all"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FailVerifyTemplate;

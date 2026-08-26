import { Button } from "@/src/components/ui/button";
import React from "react";

const DashboardTicketTemplate = () => {
  return (
    <div className="bg-secondary-layout">
      <p className="text-primary">پیغام‌ها و اطلاعیه‌ها</p>
      <div className="flex flex-col gap-5">
        {/* item */}
        <div className="flex flex-col bg-white border border-grey220 rounded-sm p-5 text-sm gap-3.5 ">
         {/* top */}
          <div className="flex justify-between items-center gap-2.5">
            <p className="font-bold">فرصت طلایی</p>
            <p className="text-xs">18 فروردین 1405</p>
          </div>
          <hr className="border border-grey220" />
          {/* bottom */}
          <div className="flex justify-between items-center gap-2.5">
            <p>بیش از 30% تخفیف برای خرید های بالای یک میلیون تومان</p>
            <Button className="">مشاهده</Button>
          </div>
        </div>
        {/* item */}
        <div className="flex flex-col bg-white border border-grey220 rounded-sm p-5 text-sm gap-3.5 ">
         {/* top */}
          <div className="flex justify-between items-center gap-2.5">
            <p className="font-bold">فرصت طلایی</p>
            <p className="text-xs">18 فروردین 1405</p>
          </div>
          <hr className="border border-grey220" />
          {/* bottom */}
          <div className="flex justify-between items-center gap-2.5">
            <p>بیش از 30% تخفیف برای خرید های بالای یک میلیون تومان</p>
            <Button className="">مشاهده</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTicketTemplate;

import {
  CircleDollarSignIcon,
  Heart,
  PlusCircleIcon,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import React from "react";
import OverviewItem from "../_components/OverviewItem";
import { getCurrentUser } from "@/src/lib/queries/user.queries";

async function DashboardIndexTemplate  ()  {
  const user = await getCurrentUser() 
  return (
    <>
      <div className="flex flex-col gap-8 h-fit">
        {/*  Welcome */}
        <div className="flex justify-between p-5 rounded-lg border border-grey220 bg-secondary">
          <div className="flex flex-col gap-2.5">
            <p className="text-primary">داشبورد کاربری</p>
            <p>به پنل کاربری خود خوش آمدید، {user?.username} عزیز </p>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex flex-col gap-2.5 text-sm ">
              <p> اعتبار کیف پول</p>
              <p>{(1_800_000).toLocaleString("fa-IR")} تومان</p>
            </div>
            <div className="size-10 bg-white rounded-full flex items-center justify-center border border-grey220">
              <CircleDollarSignIcon className="size-5 text-primary" />
            </div>
          </div>
        </div>
        {/* Overview */}
        <div className="grid grid-cols-3 gap-8">
          <OverviewItem
            title="سفارشات فعال"
            count="۳"
            changes=" ۲ سفارش در حال ارسال "
            icon={<ShoppingBag className="size-4" />}
          />
          <OverviewItem
            title="موجودی کیف پول "
            count="۲.۴۵M"
            changes=" ۲۵٪ افزایش نسبت به ماه گذشته "
            icon={<Wallet className="size-4" />}
          />
          <OverviewItem
            title="تعداد علاقه‌مندی‌ها"
            count="۵"
            changes=" ۲۸٪ افزایش نسبت به ماه گذشته "
            icon={<Heart className="size-4" />}
          />
        </div>
        {/* Order table */}
        <div className="flex flex-col gap-4 bg-secondary border border-grey220 rounded-lg p-5 overflow-x-auto whitespace-nowrap">
          <div>سفارشات اخیر</div>
          <table>
            <thead className="bg-white min-w-2xl text-sm border border-grey220 overflow-hidden">
              <th className="border-l p-2.5 border-grey220 text-primary">
                شماره
              </th>
              <th className="border-l p-2.5 border-grey220 text-primary">
                شماره سفارش
              </th>
              <th className="border-l p-2.5 border-grey220 text-primary">
                تاریخ ثبت سفارش
              </th>
              <th className="border-l p-2.5 border-grey220 text-primary">
                وضعیت سفارش
              </th>
              <th className="border-l p-2.5 border-grey220 text-primary">
                جزئیات سفارش
              </th>
            </thead>
            <tbody>
              <tr className="text-sm text-center border-b border-grey220">
                <td className="p-2">1</td>
                <td className="p-2">392874934</td>
                <td className="p-2"> 1405/1/10 --8:24</td>
                <td className="p-2">
                  <div className="bg-pending px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
                    درحال انجام
                  </div>
                </td>
                <td className="p-2 flex justify-center">
                  <PlusCircleIcon className="size-5" />
                </td>
              </tr>
              <tr className="text-sm text-center border-b border-grey220">
                <td className="p-2">2</td>
                <td className="p-2">392874934</td>
                <td className="p-2"> 1405/1/10 --8:24</td>
                <td className="p-2">
                  <div className="bg-success600 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
                    تکمیل شده
                  </div>
                </td>
                <td className="p-2 flex justify-center">
                  <PlusCircleIcon className="size-5" />
                </td>
              </tr>
              <tr className="text-sm text-center border-b border-grey220">
                <td className="p-2">3</td>
                <td className="p-2">392874934</td>
                <td className="p-2"> 1405/1/10 --8:24</td>
                <td className="p-2">
                  <div className="bg-error500 px-2.5 py-1 rounded-xs text-white text-xs m-auto cursor-pointer w-fit h-fit">
                    لغو شده
                  </div>
                </td>
                <td className="p-2 flex justify-center">
                  <PlusCircleIcon className="size-5" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardIndexTemplate;

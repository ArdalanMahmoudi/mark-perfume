import {
  Check,
  CircleDollarSignIcon,
  Heart,
  PlusCircleIcon,
  ShoppingBag,
  Wallet,
  Wallet2,
} from "lucide-react";

import OverviewItem from "../_components/OverviewItem";

import { orderColumns } from "../order/orderColumns";
import ItemActivity from "../_components/ItemActivity";
import Link from "next/link";
import { DataTable } from "@/src/components/common/data-table";
import { OrderColumnsType, OrderType } from "@/src/lib/types/orders.type";
import { Prisma } from "@/src/generated/prisma/client";

const itemActivityData = [
  {
    id: 1,
    title: "سفارش شما تحویل داده شد",
    desc: "سفارش #ORD-7842 در تاریخ ۱۴۰۲/۱۰/۱۵ تحویل داده شد.",
    icon: <Check className="size-4 text-primary" />,
    date: "۲ روز پیش",
  },
  {
    id: 2,
    title: "شارژ کیف پول",
    desc: "مبلغ ۵۰۰,۰۰۰ تومان به کیف پول شما اضافه شد.",
    icon: <Wallet2 className="size-4 text-primary" />,
    date: "۲ روز پیش",
  },
  {
    id: 3,
    title: "افزودن به علاقه‌مندی‌ها",
    desc: "محصول  ادکلن Johnwin  به لیست علاقه‌مندی‌ها اضافه شد.",
    icon: <Heart className="size-4 text-primary" />,
    date: "۵ روز پیش",
  },
];

type DashboardIndexTemplateProps = {
  userName:string
  orders:OrderColumnsType[]
}

function DashboardIndexTemplate({ userName, orders }:DashboardIndexTemplateProps) {
  return (
    <>
      <div className="flex flex-col gap-8 h-fit">
        {/*  Welcome */}
        <div className="flex lg:flex-row flex-col justify-between p-5 rounded-lg border border-grey220 bg-secondary">
          <div className="flex flex-col gap-2.5">
            <p className="text-primary">داشبورد کاربری</p>
            <p>به پنل کاربری خود خوش آمدید، {userName} عزیز </p>
          </div>
          <div className="flex justify-between lg:justify-start mt-6 lg:mt-0 gap-2.5 items-center">
            <div className="flex flex-col gap-2.5 text-sm ">
              <p> اعتبار کیف پول</p>
              <p className="font-bold">{(1_800_000).toLocaleString("fa-IR")} تومان</p>
            </div>
            <div className="size-10 bg-white rounded-full flex items-center justify-center border border-grey220">
              <CircleDollarSignIcon className="size-5 text-primary" />
            </div>
          </div>
        </div>
        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        <div className="bg-secondary-layout overflow-x-auto whitespace-nowrap">
          <p className="font-bold leading-8">سفارشات اخیر</p>
          <DataTable columns={orderColumns} data={orders} />
        </div>
        {/* Activity Layout  */}
        <div className="grid lg:grid-cols-2 gap-7">
          {/* Activity Right  */}
          <div className="bg-secondary-layout">
            <p className="leading-8 font-bold">فعالیت های اخیر</p>
            {/* items */}
            {itemActivityData.map((item) => (
              <ItemActivity
                key={item.id}
                data={item}
              />
            ))}
          </div>
          {/* Activity Left  */}
          <div className="bg-secondary-layout">
            <p className="font-bold leading-8">پیشنهادات ویژه برای شما</p>
            <div className="flex bg-white border border-grey220 rounded-sm p-2 lg:p-3.5 gap-2.5 items-center justify-between">
              <div className="flex gap-2.5 items-center">
                <p className="text-xs lg:text-sm border border-grey220 rounded-sm flex items-center justify-center min-w-20 min-h-20 bg-secondary text-primary">
                  تخفیف ویژه
                </p>
                <div className="flex flex-col gap-2.5 text-sm">
                  <p className="text-xs lg:text-base">کد تخفیف 5۰٪</p>
                  <p className="text-xs lg:text-base">برای خریدهای بالای 2 میلیون تومان</p>
                </div>
              </div>
              <Link
                href={"/dashboard"}
                className="text-xs lg:text-sm text-primary text-end"
              >
                استفاده
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardIndexTemplate;

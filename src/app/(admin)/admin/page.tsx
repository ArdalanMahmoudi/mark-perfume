import React from "react";
import AdminPanelLayout from "./layout";
import InfoBox from "@/src/templates/admin/_components/InfoBox";
import { ChartAreaInteractive } from "@/src/templates/admin/_components/ChartArea";

type TrendType = {
  caption: string;
  status: "Upward" | "Descending";
};

type InfoBoxProps = {
  id: number;
  title: string;
  tabularNums: string;
  percent: number;
  trend: TrendType;
  footerDesc: string;
};

const AdminPage = () => {
  const infoboxFakeData: InfoBoxProps[] = [
    {
      id: 1,
      title: "کل درآمد",
      tabularNums: "22,000,000 تومان",
      percent: 12.5,
      trend: { status: "Upward", caption: "روند صعودی در این ماه" },
      footerDesc: "بازدیدکنندگان ۶ ماه گذشته",
    },
    {
      id: 2,
      title: "مشتریان جدید",
      tabularNums: "1,234",
      percent: 20,
      trend: { status: "Descending", caption: "کاهش ۲۰ درصدی در این دوره" },
      footerDesc: "مبحث جذب نیازمند توجه است",
    },
    {
      id: 3,
      title: "کاربران فعال",
      tabularNums: "4,567",
      percent: 15,
      trend: { status: "Upward", caption: "حفظ بالای کاربران" },
      footerDesc: "میزان مشارکت فراتر از اهداف است.",
    },
    {
      id: 4,
      title: "نرخ رشد",
      tabularNums: "4.5%",
      percent: 4.5,
      trend: { status: "Upward", caption: "افزایش پیوسته عملکرد" },
      footerDesc: "با پیش‌بینی‌های رشد مطابقت دارد",
    },
  ];
  return (
    <div className="flex flex-col gap-4 py-4 md:py-6 md:gap-6">
      <div className="grid grid-cols-2 gap-4">
        {infoboxFakeData.map((item) => (
          <InfoBox
            key={item.id}
            title={item.title}
            percent={item.percent}
            trend={item.trend}
            footerDesc={item.footerDesc}
            tabularNums={item.tabularNums}
          />
        ))}
        <ChartAreaInteractive/>
      </div>
    </div>
  );
};

export default AdminPage;

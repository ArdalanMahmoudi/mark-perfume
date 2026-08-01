import React from "react";

type TrendType = {
  caption: string;
  status: "Upward" | "Descending";
};

type InfoBoxProps = {
  title: string;
  tabularNums: string;
  percent: number;
  trend: TrendType;
  footerDesc: string;
};

const InfoBox = ({
  title,
  tabularNums,
  percent,
  trend,
  footerDesc,
}: InfoBoxProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card py-6 text-card-foreground shadow-sm bg-linear-to-t from-zinc-100 via-zinc-50 to-white border border-grey220">
      <div className=" grid a items-start gap-2 px-6 ">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-semibold tabular-nums ">
          {tabularNums}
        </div>
        <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
          <span
            data-variant="outline"
            className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap  focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50  "
          >
            {trend.status === "Upward" ? (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-trending-up size-4"
            >
              <path d="M3 17l6 -6l4 4l8 -8"></path>
              <path d="M14 7l7 0l0 7"></path>
            </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-trending-down size-4"
              >
                <path d="M3 7l6 6l4 -4l8 8"></path>
                <path d="M21 10l0 7l-7 0"></path>
              </svg>
            )}
            {percent.toLocaleString("fa-IR")}%
            {trend.status === "Upward" ? "+" : "-"}
          </span>
        </div>
      </div>
      <div className="flex px-6  flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {trend.caption}{" "}
          {trend.status === "Upward" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-trending-up "
              >
                <path d="M3 17l6 -6l4 4l8 -8"></path>
                <path d="M14 7l7 0l0 7"></path>
              </svg>
          
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-trending-down "
            >
              <path d="M3 7l6 6l4 -4l8 8"></path>
              <path d="M21 10l0 7l-7 0"></path>
            </svg>
          )}
        </div>
        <div className="text-muted-foreground">{footerDesc}</div>
      </div>
    </div>
  );
};

export default InfoBox;

import { ChartNoAxesColumn } from "lucide-react";
import React from "react";

type OverviewItemProps = {
  title: string;
  count: string;
  icon: React.ReactNode;
  changes: string;
};

const OverviewItem = ({ title, count, icon, changes }:OverviewItemProps) => {
  return (
    <div className="bg-secondary border border-grey220 rounded-lg p-5 flex flex-col gap-2.5">
      {/* top */}
      <div className="flex justify-between gap-4 text-sm items-center">
        <div className="flex flex-col gap-2.5">
          <p>{title}</p>
          <p className="text-lg font-bold">{count}</p>
        </div>
        <div className="size-10 bg-white text-primary rounded-full flex items-center justify-center border border-grey220">
          {icon}
        </div>
      </div>
      <hr />
      {/* bottom */}
      <p className="flex gap-1 text-sm text-primary">
        
        <ChartNoAxesColumn className="size-4" />
        <span>{changes}</span>
      </p>
    </div>
  );
};

export default OverviewItem;

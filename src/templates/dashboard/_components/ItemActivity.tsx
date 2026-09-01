import React from "react";

type ItemActivityProps = {
  data: { title: string; desc: string; icon: React.ReactNode; date: string };
};

const ItemActivity = ({ data }:ItemActivityProps) => {
  return (
    <div className="flex gap-1.5">
      <div className="h-fit text-lg bg-white border border-grey220 p-2 text-primary rounded-full ">
        {data.icon}
      </div>
      <div className="text-sm flex flex-col ">
        <p className="font-bold ">{data.title}</p>
        <p className="text-sm leading-8">{data.desc}</p>
        <p className="text-grey100 text-[10px]">{data.date}</p>
      </div>
    </div>
  );
};

export default ItemActivity;

import Counter from "@/src/components/common/Counter";
import React from "react";

const HeroItem = ({
  count,
  title,
  desc,
}: {
  count: number;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-2.5">
      <div className="flex items-center">
        <span className="w-3 h-10 rounded-s-md bg-primary"></span>
        <div className="w-12.5 h-15 flex items-center justify-center rounded-l-4xl bg-secondary border border-green-220 gap-1">
          <Counter end={count} suffix="+"/>
        </div>
      </div>
      <div>
        <p className="text-primary font-bold text-sm lg:text-lg text-center md:text-start">{title}</p>
        <p className="text-sm text-[10px] text-center md:text-start">{desc}</p>
      </div>
    </div>
  );
};

export default HeroItem;

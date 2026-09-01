import Counter from "@/src/components/common/Counter";
import React from "react";

const FavorItem = ({count, title}:{count:number, title:string}) => {
  return (
    <div className="w-12 lg:w-20 h-32 bg-white  rounded-full border border-grey220 flex flex-col items-center gap-2.5 justify-center rotate-35">
      <Counter end={count} className="text-primary font-bold -rotate-35 lg:text-lg" suffix="+"/>
      <div className="text-xs -rotate-35 text-center ">{title}</div>
    </div>
  );
};

export default FavorItem;

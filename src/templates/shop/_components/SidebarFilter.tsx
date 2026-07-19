'use client'
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { PropsWithChildren, useState } from "react";


const SidebarFilter = ({title, children} : {title:string} & PropsWithChildren) => {
      const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="bg-white rounded-sm w-full border border-grey220">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="leading-8 w-full cursor-pointer p-2.5 flex justify-between items-center gap-2.5 bg-secondary transition-colors duration-300 ease-in"
      >
        <span className="text-primary text-balance ">{title}</span>
        {showFilter ? (
          <ChevronDown className="text-primary size-5" />
        ) : (
          <ChevronUp className="text-primary size-5" />
        )}
      </button>
      <div
        className={`bg-white overflow-hidden transition-all duration-300 border-2 border-secondary rounded-t-none rounded-b-sm px-5  ${showFilter ? "h-auto py-5" : "h-0 p-0"} flex flex-col gap-4 `}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarFilter;

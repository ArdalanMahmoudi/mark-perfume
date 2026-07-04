import React from "react";

const FavorItem = () => {
  return (
    <div className="w-12 lg:w-20 h-32 bg-white  rounded-full border border-grey220 flex flex-col items-center gap-2.5 justify-center rotate-35">
      <span className="text-primary font-bold -rotate-35 lg:text-lg">۳۰۰۰+</span>
      <div className="text-xs -rotate-35 text-center ">بازدید ماهانه</div>
    </div>
  );
};

export default FavorItem;

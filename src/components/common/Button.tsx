import React, { PropsWithChildren } from "react";

const Button = ({ children }: PropsWithChildren) => {
  return (
    <button className="bg-primary border border-grey220 text-xs text-white py-1 px-2 rounded-xs cursor-pointer transition-all duration-500 ease-linear group-hover:text-primary group-hover:bg-white">
      {children}
    </button>
  );
};

export default Button;

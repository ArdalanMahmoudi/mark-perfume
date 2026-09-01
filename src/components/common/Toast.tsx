import { useToast } from "@/src/context/toast-context";
import { ToastType } from "@/src/lib/types/toast.type";
import { Check, CircleX, Info, TriangleAlert } from "lucide-react";
import React from "react";

const statusIcons = {
  success: <Check className="size-5 text-success600" />,
  error: <CircleX className="size-5 text-error500" />,
  warning: <TriangleAlert className="size-5 text-warning400" />,
  info: <Info className="size-5 text-blue-500" />,
};

const Toast = ({ id, message, status, isLeaving, removeToast }: ToastType) => {
  const handleAnimationEnd = () => {
    if (isLeaving) {
      removeToast?.(id);
    }
  };
  return (
    <>
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`${isLeaving ? "animate-toast-out" : "animate-toast-in"} max-w-87 flex items-center my-2 py-2 px-2.5 shadow pointer-events-auto rounded-lg text-[#363636] z-999   ${(status === "success" && "bg-success100") || (status === "error" && "bg-error100") || (status === "warning" && "bg-warning100") || (status === "info" && "bg-blue-100")}`}
      >
        {/* message */}
        <p className="text-inherit my-1 mx-2.5 flex justify-center text-xs lg:text-sm">
          {message}
        </p>
        {/* icon */}
        {statusIcons[status]}
      </div>
    </>
  );
};

export default Toast;

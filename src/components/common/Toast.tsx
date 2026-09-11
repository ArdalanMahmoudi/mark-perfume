import { ToastType } from "@/src/lib/types/toast.type";
import {
  Check,
  CircleX,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

const statusConfig = {
  success: {
    icon: Check,
    iconWrapper: "bg-success100 text-success600",
    border: "border-success200",
    accent: "bg-success500",
  },
  error: {
    icon: CircleX,
    iconWrapper: "bg-error100 text-error500",
    border: "border-error200",
    accent: "bg-error500",
  },
  warning: {
    icon: TriangleAlert,
    iconWrapper: "bg-warning100 text-warning500",
    border: "border-warning200",
    accent: "bg-warning400",
  },
  info: {
    icon: Info,
    iconWrapper: "bg-blue-100 text-blue-500",
    border: "border-blue-200",
    accent: "bg-blue-500",
  },
};

const Toast = ({
  id,
  message,
  status,
  isLeaving,
  removeToast,
}: ToastType) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  const handleAnimationEnd = () => {
    if (isLeaving) {
      removeToast?.(id);
    }
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      role="alert"
      className={`
        relative
        flex
        w-full
        min-w-0
        items-center
        gap-3
        overflow-hidden
        rounded-xl
        border
        bg-white
        px-3.5
        py-3
        pr-10
        shadow-[0_8px_30px_rgba(0,0,0,0.10)]
        ${config.border}
        ${isLeaving ? "animate-toast-out" : "animate-toast-in"}
      `}
    >
      {/* Accent */}
      <span
        className={`
          absolute
          left-0
          top-0
          h-full
          w-1
          ${config.accent}
        `}
      />

      {/* Icon */}
      <div
        className={`
          flex
          size-8
          shrink-0
          items-center
          justify-center
          rounded-full
          ${config.iconWrapper}
        `}
      >
        <Icon className="size-4.5" strokeWidth={2.2} />
      </div>

      {/* Message */}
      <p
        className="
          min-w-0
          flex-1
          text-sm
          font-medium
          leading-5
          text-[#363636]
        "
      >
        {message}
      </p>

      {/* Close */}
      <button
        type="button"
        onClick={() => removeToast?.(id)}
        aria-label="Close notification"
        className="
          absolute
          right-2.5
          top-1/2
          flex
          size-6
          -translate-y-1/2
          items-center
          justify-center
          rounded-md
          text-gray-400
          transition
          hover:bg-gray-100
          hover:text-gray-600
        "
      >
        <X className="size-4" />
      </button>
    </div>
  );
};

export default Toast;
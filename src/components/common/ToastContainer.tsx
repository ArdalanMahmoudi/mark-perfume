"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";
import { useToast } from "@/src/context/toast-context";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return createPortal(
    <div
      className="
        pointer-events-none
        fixed
        left-3
        right-3
        top-3
        z-9999
        flex
        flex-col
        gap-2
        sm:left-auto
        sm:right-4
        sm:top-4
        sm:w-90
      "
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          removeToast={removeToast}
        />
      ))}
    </div>,
    document.getElementById("toast-root")!,
  );
};

export default ToastContainer;
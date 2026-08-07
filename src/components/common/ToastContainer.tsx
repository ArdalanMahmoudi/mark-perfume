"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";
import { useToast } from "@/src/context/toast-context";

const ToastContainer = () => {
  const { toasts , removeToast} = useToast();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true)
  }, []);

  if (!mount) return;
  return createPortal(
    <div className="flex flex-col max-w-sm fixed bottom-4 left-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} removeToast={removeToast} />
      ))}
    </div>,
    document.getElementById("toast-root")!,
  );
};

export default ToastContainer;

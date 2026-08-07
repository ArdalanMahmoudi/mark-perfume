"use client";
import { createContext, useContext, useState } from "react";
import ToastContainer from "../components/common/ToastContainer";
import { ToastType } from "../lib/types/toast.type";

type ToastContextType = {
  toasts: ToastType[];
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  removeToast: (toastId: string) => void;
  startLeaving: (toastId: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState([]);

  function addToast(toast: ToastType) {
    setToasts((prevToast) => [...prevToast,toast].slice(-3));

    setTimeout(() => {
      startLeaving(toast.id);
    }, 3000);
  }

  function startLeaving(toastId: string) {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === toastId ? { ...toast, isLeaving: true } : toast,
      ),
    );
  }

  function removeToast(toastId: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  }

  function success(message: string) {
    const toast: ToastType = {
      id: crypto.randomUUID(),
      message,
      status: "success",
    };
    addToast(toast);
  }
  function error(message: string) {
    const toast: ToastType = {
      id: crypto.randomUUID(),
      message,
      status: "error",
    };
    addToast(toast);
  }
  function warning(message: string) {
    const toast: ToastType = {
      id: crypto.randomUUID(),
      message,
      status: "warning",
    };
    addToast(toast);
  }
  function info(message: string) {
    const toast: ToastType = {
      id: crypto.randomUUID(),
      message,
      status: "info",
    };
    addToast(toast);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        success,
        error,
        warning,
        info,
        removeToast,
        startLeaving,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
export function useToast() {
  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error("error context");
  }
  return toastContext;
}

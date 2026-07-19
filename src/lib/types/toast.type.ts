export type ToastType = {
  id: string;
  message: string;
  status: "success" | "error" | "warning" | "info";
  isLeaving?: boolean;
  removeToast?:(toastId:string) => void
};

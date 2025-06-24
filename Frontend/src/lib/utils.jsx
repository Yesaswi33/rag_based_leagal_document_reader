import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleSuccess = (msg) => {
  toast.success(msg, {
      position: "top-right",
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
      position: "top-right",
  });
};

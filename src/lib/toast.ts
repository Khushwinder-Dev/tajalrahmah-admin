// src/utils/toast.ts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

withReactContent(Swal);

// Base Toast configuration
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "rounded-lg shadow-md",
  },
});

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string,
  customBackground?: string
) => {
  Toast.fire({
    icon: type,
    title: message,
    background: customBackground,
    customClass: {
      popup: customBackground
        ? "rounded-lg shadow-md !text-white"
        : "rounded-lg shadow-md",
    },
  });
};

// Enhanced helpers with custom colors
export const toastSuccess = (message: string, customColor?: string) =>
  showToast("success", message, customColor);

export const toastError = (message: string, customColor?: string) =>
  showToast("error", message, customColor);

export const toastInfo = (message: string) => showToast("info", message);
export const toastWarning = (message: string) => showToast("warning", message);

// Specific helpers for delete/restore actions
export const toastDelete = (message: string) =>
  showToast("success", message, "#f52727"); // Red background

export const toastRestore = (message: string) =>
  showToast("success", message, "#31f527"); // Green background

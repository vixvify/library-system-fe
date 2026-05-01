import type { SweetAlertOptions } from "sweetalert2";

export const DELETE_BOOK_CONFIRM_ALERT = {
  title: "Delete this book?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Delete",
  cancelButtonText: "Cancel",
  confirmButtonColor: "#ef4444",
  cancelButtonColor: "#27272a",
  background: "#18181b",
  color: "#ffffff",
  reverseButtons: true,
} satisfies SweetAlertOptions;

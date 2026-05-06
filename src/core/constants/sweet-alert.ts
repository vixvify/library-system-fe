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

export const getStudentIdAlert = (action: "borrow" | "return") =>
  ({
    title: "Enter student ID",
    text: `Please enter your student ID before you ${action} this book.`,
    input: "text",
    inputPlaceholder: "Student ID",
    inputAttributes: {
      inputmode: "numeric",
      maxlength: "11",
    },
    showCancelButton: true,
    confirmButtonText: "Continue",
    cancelButtonText: "Cancel",
    background: "#111113",
    color: "#ffffff",
    confirmButtonColor: "#059669",
    cancelButtonColor: "#27272a",
    inputValidator: (value) => {
      const studentId = value.trim();

      if (!studentId) {
        return "Student ID is required";
      }

      if (!/^\d+$/.test(studentId)) {
        return "Student ID must contain numbers only";
      }

      if (studentId.length !== 11) {
        return "Student ID must be exactly 11 digits";
      }

      return null;
    },
  }) satisfies SweetAlertOptions;

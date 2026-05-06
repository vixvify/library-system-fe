"use client";

import { useState } from "react";
import { IBook } from "@/core/domain/book";
import { getStudentIdAlert } from "@/core/constants/sweet-alert";
import Swal from "sweetalert2";

export default function BookCard({
  book,
  handleBorrow,
  handleReturn,
}: {
  book: IBook;
  handleBorrow: (bookId: string) => Promise<void>;
  handleReturn: (bookId: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<"borrow" | "return" | null>(
    null,
  );

  const onAction = async () => {
    const action = book.available ? "borrow" : "return";
    const result = await Swal.fire(getStudentIdAlert(action));

    if (!result.isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      setPendingAction(action);
      if (action === "borrow") {
        await handleBorrow(book.id);
      } else {
        await handleReturn(book.id);
      }
    } finally {
      setLoading(false);
      setPendingAction(null);
    }
  };

  const actionLabel = book.available ? "Borrow Book" : "Return Book";
  const loadingLabel =
    pendingAction === "borrow" ? "Borrowing..." : "Returning...";

  return (
    <div
      className="
      group relative rounded-2xl 
      bg-white/5 backdrop-blur-xl
      p-6
      ring-1 ring-white/10
      shadow-[0_10px_30px_rgba(0,0,0,0.6)]
    "
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-linear-to-br from-white/5 to-transparent" />

      <div className="flex items-start justify-between">
        <span className="text-xs tracking-wide text-gray-500">
          {book.type === "EBOOK" ? "E-BOOK" : "PRINTED"}
        </span>

        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            book.available
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-300"
          }`}
        >
          {book.available ? "Available" : "Borrowed"}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white leading-snug">
        {book.title}
      </h2>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-black/20 px-3 py-2 text-xs text-gray-400 ring-1 ring-white/10">
        <span>{book.borrow_days} days</span>
        <span>{book.available ? "Ready to borrow" : "Ready to return"}</span>
      </div>

      <div className="my-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <button
        onClick={onAction}
        disabled={loading}
        className={`
          w-full rounded-xl py-2.5 text-sm font-medium transition-all cursor-pointer
          ${
            loading
              ? "bg-white/10 text-gray-500 cursor-wait"
              : book.available
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-amber-300 text-black hover:bg-amber-200"
          }
        `}
      >
        {loading ? loadingLabel : actionLabel}
      </button>
    </div>
  );
}

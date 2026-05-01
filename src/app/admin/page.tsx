"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DELETE_BOOK_CONFIRM_ALERT } from "@/core/constants/sweet-alert";
import { IBook, ICreateBook } from "@/core/domain/book";
import { bookService } from "@/infrastructure/container";
import { handleError } from "@/lib/error-handler";

function isBook(book: IBook | null | undefined): book is IBook {
  return Boolean(book && book.id && book.title && book.type);
}

export default function AdminPage() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICreateBook>({
    defaultValues: {
      title: "",
      type: "EBOOK",
    },
  });

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchBooks = async () => {
    const bookList = await bookService.getAllBooks();
    setBooks(bookList.filter(isBook));
  };

  useEffect(() => {
    let isMounted = true;

    const loadBooks = async () => {
      try {
        const bookList = await bookService.getAllBooks();

        if (isMounted) {
          setBooks(bookList.filter(isBook));
        }
      } catch (error) {
        if (isMounted) {
          showSnackbar(handleError(error), "error");
        }
      } finally {
        if (isMounted) {
          setIsLoadingBooks(false);
        }
      }
    };

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = async (data: ICreateBook) => {
    try {
      await bookService.createBook(data);
      await fetchBooks();
      reset({
        title: "",
        type: "EBOOK",
      });
      showSnackbar("Book created successfully", "success");
      router.refresh();
    } catch (error) {
      showSnackbar(handleError(error), "error");
    }
  };

  const handleDelete = async (book: IBook) => {
    const result = await Swal.fire({
      ...DELETE_BOOK_CONFIRM_ALERT,
      text: `This will remove "${book.title}" from the library.`,
    });

    if (!result.isConfirmed) {
      return;
    }

    const previousBooks = books;
    setDeletingBookId(book.id);
    setBooks((prev) => prev.filter((item) => item.id !== book.id));

    try {
      await bookService.deleteBook(book.id);
      showSnackbar("Book deleted successfully", "success");
      router.refresh();
    } catch (error) {
      setBooks(previousBooks);
      showSnackbar(handleError(error), "error");
    } finally {
      setDeletingBookId(null);
    }
  };

  const handleSnackbarClose = (
    _event?: SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <main className="min-h-screen bg-[#0b0b0c] px-6 py-12 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          <section className="rounded-3xl bg-white/5 p-8 shadow-xl ring-1 ring-white/10 backdrop-blur-xl">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Admin</h1>
              <p className="mt-1 text-sm text-gray-500">
                Add books and remove existing entries
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Atomic Habits"
                  {...register("title", { required: "Title is required" })}
                  className="
                  rounded-xl px-4 py-2.5
                  bg-white/5 text-white
                  ring-1 ring-white/10
                  placeholder:text-gray-500
                  outline-none
                  focus:ring-white/20
                "
                />
                {errors.title && (
                  <span className="text-xs text-red-400">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">Type</label>
                <select
                  {...register("type")}
                  className="
                  rounded-xl px-4 py-2.5
                  bg-white/5 text-white
                  ring-1 ring-white/10
                  outline-none
                  focus:ring-white/20
                "
                >
                  <option value="EBOOK" className="bg-black">
                    E-Book
                  </option>
                  <option value="PRINTED" className="bg-black">
                    Printed
                  </option>
                </select>
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="
                  w-full cursor-pointer rounded-xl py-2.5
                  bg-white/10 text-gray-300
                  transition
                  hover:bg-white/20
                "
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                  w-full cursor-pointer rounded-xl py-2.5
                  bg-white text-black
                  font-medium
                  transition
                  hover:bg-gray-200
                  active:scale-[0.98]
                  disabled:cursor-wait
                  disabled:bg-gray-300
                "
                >
                  {isSubmitting ? "Adding..." : "Add Book"}
                </button>
              </div>
            </form>
          </section>

          <section className="flex h-[calc(100vh-6rem)] min-h-0 flex-col rounded-3xl bg-white/5 p-8 shadow-xl ring-1 ring-white/10 backdrop-blur-xl">
            <div className="mb-6 flex shrink-0 items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Existing Books</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {books.length} books in the library
                </p>
              </div>
            </div>

            {isLoadingBooks ? (
              <div className="rounded-2xl bg-black/20 px-4 py-8 text-center text-sm text-gray-400 ring-1 ring-white/10">
                Loading books...
              </div>
            ) : books.length === 0 ? (
              <div className="rounded-2xl bg-black/20 px-4 py-8 text-center text-sm text-gray-400 ring-1 ring-white/10">
                No books yet
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-scroll pr-2 [scrollbar-color:rgba(255,255,255,0.22)_transparent] [scrollbar-width:thin]">
                <div className="flex flex-col gap-3">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="flex flex-col gap-4 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs tracking-wide text-gray-500">
                            {book.type === "EBOOK" ? "E-BOOK" : "PRINTED"}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              book.available
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-amber-500/10 text-amber-300"
                            }`}
                          >
                            {book.available ? "Available" : "Borrowed"}
                          </span>
                        </div>
                        <h3 className="mt-2 wrap-break-word text-base font-medium text-white">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          Borrowed {book.borrow_days} days
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(book)}
                        disabled={deletingBookId === book.id}
                        className="rounded-xl cursor-pointer bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 ring-1 ring-red-400/20 transition hover:bg-red-500/20 disabled:cursor-wait disabled:text-red-300/50 sm:w-24"
                      >
                        {deletingBookId === book.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1800}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

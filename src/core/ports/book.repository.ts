import { ApiResponse } from "@/infrastructure/interface/response";
import { ICreateBook, IBook, IUpdateBookTitle } from "../domain/book";

export interface IBookRepository {
  getAllBooks(): Promise<ApiResponse<IBook[]>>;
  createBook(book: ICreateBook): Promise<ApiResponse<IBook>>;
  updateBookTitle(
    bookId: string,
    book: IUpdateBookTitle,
  ): Promise<ApiResponse<IBook>>;
  borrowBook(bookId: string): Promise<ApiResponse<IBook>>;
  returnBook(bookId: string): Promise<ApiResponse<IBook>>;
  deleteBook(bookId: string): Promise<ApiResponse<void>>;
}

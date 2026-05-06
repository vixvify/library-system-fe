import http from "@/lib/http";
import { ApiResponse } from "../interface/response";
import { IBookRepository } from "@/core/ports/book.repository";
import { ICreateBook, IBook, IUpdateBookTitle } from "@/core/domain/book";

export class BookRepository implements IBookRepository {
  async getAllBooks(): Promise<ApiResponse<IBook[]>> {
    const response = await http.get<ApiResponse<IBook[]>>("/api/library/books");
    return response.data;
  }
  async createBook(book: ICreateBook): Promise<ApiResponse<IBook>> {
    const response = await http.post<ApiResponse<IBook>>(
      "/api/library/books",
      book,
    );
    return response.data;
  }
  async updateBookTitle(
    bookId: string,
    book: IUpdateBookTitle,
  ): Promise<ApiResponse<IBook>> {
    const response = await http.patch<ApiResponse<IBook>>(
      `/api/library/books/${bookId}`,
      book,
    );
    return response.data;
  }
  async borrowBook(bookId: string): Promise<ApiResponse<IBook>> {
    const response = await http.put<ApiResponse<IBook>>(
      `/api/library/books/borrow/${bookId}`,
    );
    return response.data;
  }
  async returnBook(bookId: string): Promise<ApiResponse<IBook>> {
    const response = await http.put<ApiResponse<IBook>>(
      `/api/library/books/return/${bookId}`,
    );
    return response.data;
  }
  async deleteBook(bookId: string): Promise<ApiResponse<void>> {
    const response = await http.delete<ApiResponse<void>>(
      `/api/library/books/${bookId}`,
    );
    return response.data;
  }
}

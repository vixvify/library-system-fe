import { ICreateBook, IBook, IUpdateBookTitle } from "../domain/book";
import { IBookRepository } from "../ports/book.repository";

export class BookService {
  constructor(private bookRepository: IBookRepository) {}

  async getAllBooks(): Promise<IBook[]> {
    const response = await this.bookRepository.getAllBooks();
    return response.data;
  }
  async createBook(book: ICreateBook): Promise<IBook> {
    const response = await this.bookRepository.createBook(book);
    return response.data;
  }
  async updateBookTitle(
    bookId: string,
    book: IUpdateBookTitle,
  ): Promise<IBook> {
    const response = await this.bookRepository.updateBookTitle(bookId, book);
    return response.data;
  }
  async borrowBook(bookId: string): Promise<IBook> {
    const response = await this.bookRepository.borrowBook(bookId);
    return response.data;
  }
  async returnBook(bookId: string): Promise<IBook> {
    const response = await this.bookRepository.returnBook(bookId);
    return response.data;
  }
  async deleteBook(bookId: string): Promise<void> {
    await this.bookRepository.deleteBook(bookId);
  }
}

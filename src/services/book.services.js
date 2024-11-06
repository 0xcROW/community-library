import bookRepository from "../repositories/book.repository.js";

async function createBookService(newBook, userId) {
  const createdBook = await bookRepository.createBookRepository(newBook, userId);
  if (!createdBook) throw new Error('Book not created');
  return createdBook;
}

async function findAllBooksService() {
  const books = await bookRepository.findAllBooksRepository();
  return books;
}

export default {
    createBookService,
    findAllBooksService
}
import bookRepository from '../repositories/book.repository.js';

async function createBookService(newBook, userId) {
  const createdBook = await bookRepository.createBookRepository(newBook, userId);
  if (!createdBook) throw new Error('Book not created');
  return createdBook;
}

async function findAllBooksService() {
  return await bookRepository.findAllBooksRepository();
}

async function findBookByIdService(bookId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error('Book not found');
  return book;
}

async function updateBookService(updatedBook, bookId, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error('Book not found');
  if (book.userId !== userId) throw new Error('Unauthorized');
  return await bookRepository.updateBookRepository(updatedBook, bookId);
}

async function deleteBookService(bookId, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error('Book not found');
  if (book.userId !== userId) throw new Error('Unauthorized');
  return await bookRepository.deleteBookRepository(bookId);
}

async function searchBooksService(query) {
  // if (!query) throw new Error('Query not found');
  if (!query) return await bookRepository.findAllBooksRepository();
  return await bookRepository.searchBooksRepository(query);
}

export default {
  createBookService,
  findAllBooksService,
  findBookByIdService,
  updateBookService,
  deleteBookService,
  searchBooksService
};
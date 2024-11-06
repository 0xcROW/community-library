import bookServices from "../services/book.services.js";

async function createBookController(req, res) {
    const userId = req.userId;
    const newBook = req.body;
  try {
    const createdBook = await bookServices.createBookService(newBook, userId);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function findAllBooksController(req, res) {
    try {
        const books = await bookServices.findAllBooksService();
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    createBookController,
    findAllBooksController
}
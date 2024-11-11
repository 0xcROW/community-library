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

async function findBookByIdController(req, res) {
  
  const bookId = req.params.id;
  try {
    const book = await bookServices.findBookByIdService(bookId);
    return res.status(200).json(book);
    } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function updateBookController(req, res) {
    const updatedBook = req.body;
    const bookId = req.params.id;
    const userId = req.userId;

    if (!updatedBook || !bookId || !userId) { return res.status(400).json({ message: "Invalid input data" }); }

    try {
        const response = await bookServices.updateBookService(updatedBook, bookId, userId);
        res.status(200).send(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function deleteBookController(req, res) {
    const userId = req.userId;
    const bookId = req.params.id;
    try {
        const response = await bookServices.deleteBookService(bookId, userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController
}
import bookController from "../controller/book.controllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { bookSchema } from "../schemas/book.schema.js";
import { validate, validateBookId } from "../middlewares/validation.middlewares.js";

const router = Router();

router.use(authMiddleware);
router.post("/books", validate(bookSchema), bookController.createBookController);
router.get("/books", bookController.findAllBooksController);
router.get("/books/search", bookController.searchBooksController);
router.get("/books/:id", validateBookId, bookController.findBookByIdController);
router.patch("/books/:id", validateBookId, bookController.updateBookController);
router.delete("/books/:id", validateBookId, bookController.deleteBookController);

export default router;
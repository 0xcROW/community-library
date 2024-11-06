import bookController from "../controller/book.controllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { bookSchema } from "../schemas/book.schema.js";
import { validate } from "../middlewares/validation.middlewares.js";

const router = Router();

router.use(authMiddleware);
router.post("/books", validate(bookSchema), bookController.createBookController);
router.get("/books", bookController.findAllBooksController);

export default router;
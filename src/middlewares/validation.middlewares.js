import { userIdSchema } from "../schemas/user.schema.js";
import { bookIdSchema } from "../schemas/book.schema.js";
import { loanIdSchema } from "../schemas/loan.schema.js";

const validate = (schema) => (req, res, next) => {
    try {
        // 'parse' vem da biblioteca 'zod'
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}

const validateUserId = (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        userIdSchema.parse({ id: userId });
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}

const validateBookId = (req, res, next) => {
    try {
        const bookId = Number(req.params.id);
        bookIdSchema.parse({ id: bookId });
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}

const validateLoanId = (req, res, next) => {
  try {
    //por algum motivo Number(req.params.id) não funciona aqui, então usamos o '+' para converter a string para número direto dentro do parse
    loanIdSchema.parse({ loanId: +req.params.id });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};


export {
    validate,
    validateUserId,
    validateBookId,
    validateLoanId
};

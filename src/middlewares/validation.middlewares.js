import { userIdSchema } from "../schemas/user.schema.js";
import { bookIdSchema } from "../schemas/book.schema.js";

const validate = (schema) => (req, res, next) => {
    try {
        //parse comes from zod library
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }

}

const validateUserId = (req, res, next) => {
    try {
        const userId = Number(req.params.id)
        userIdSchema.parse({id: userId});
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }

}

const validateBookId = (req, res, next) => {
    try {
        const bookId = Number(req.params.id)
        bookIdSchema.parse({id: bookId});
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }

}

export {
    validate,
    validateUserId,
    validateBookId
};
const validate = (schema) => (req, res, next) => {
    try {
        //parse comes from zod library
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({error: error.errors});
    }

}

export {validate};
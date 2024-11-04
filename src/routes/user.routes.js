import { Router }  from 'express';
import userController from '../controller/user.controllers.js';
import { validate } from '../middlewares/validation.middlewares.js';
import { userSchema } from '../schemas/user.schema.js';

const router = Router();

router.post(
    '/users',
    validate(userSchema),
    userController.createUserController
);
router.get('/users', userController.findAllUsersController);
router.get('/users/:id', userController.findByIdController);
router.put('/users/:id',
    validate(userSchema),
    userController.updateUserController
);

export default router;
import { Router }  from 'express';
import userController from '../controller/user.controllers.js';
import { validate, validateUserId } from '../middlewares/validation.middlewares.js';
import { userSchema } from '../schemas/user.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/',
  validate(userSchema),
  userController.createUserController
);
router.post(
  '/login',
  userController.loginController
);

router.use(authMiddleware); // Add below this line the routes that need authentication

router.get('/', userController.findAllUsersController);
router.get('/:id', validateUserId, userController.findByIdController);
router.patch('/:id',
  validateUserId,
  userController.updateUserController
);
router.delete('/:id', validateUserId, userController.deleteUserController);

export default router;
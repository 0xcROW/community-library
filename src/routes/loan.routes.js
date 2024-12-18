import loanControllers from '../controller/loan.controllers.js';
import { Router } from 'express';
import { validate, validateLoanId } from '../middlewares/validation.middlewares.js';
import { loanSchema } from '../schemas/loan.schema.js';

const router = Router();

router.post('/', validate(loanSchema), loanControllers.createLoanController);
router.get('/', loanControllers.findAllLoansController);
router.get('/:id', validateLoanId, loanControllers.findLoanByIdController);
router.delete('/:id', validateLoanId, loanControllers.deleteLoanController);

export default router;
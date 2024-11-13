import loanServices from '../services/loan.services.js';

async function createLoanController(req, res) {
  const userId = req.userId;
  const { bookId, dueDate } = req.body;
    
  if (!userId || !bookId || !dueDate) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const createdLoan = await loanServices.createLoanService(userId, bookId, dueDate);
    res.status(201).send(createdLoan);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function findAllLoansController(req, res) {
  try {
    const loans = await loanServices.findAllLoansService();
    res.status(200).send(loans);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function findLoanByIdController(req, res) {
  const loanId = req.params.id;

  if (!loanId) {
    return res.status(400).send('Loan ID is required');
  }

  try {
    const loan = await loanServices.findLoanByIdService(loanId);
    res.status(200).send(loan);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function deleteLoanController(req, res) {
  const loanId = req.params.id;
  const userId = req.userId;

  if (!loanId || !userId) {
    return res.status(400).send('Loan ID and User ID are required');
  }

  try {
    const response = await loanServices.deleteLoanService(loanId, userId);
    res.status(200).send(response);
  } catch (err) {
    res.status(403).send(err.message);
  }
}

export default {
  createLoanController,
  findAllLoansController,
  findLoanByIdController,
  deleteLoanController
};

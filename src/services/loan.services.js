import loanRepository from "../repositories/loan.repository.js";

async function createLoanService(userId, bookId, dueDate) {
    try {
        if (!userId || !bookId || !dueDate) {
            throw new Error("Missing required parameters");
        }
        const createdLoan = await loanRepository.createLoanRepository(userId, bookId, dueDate);
        if (!createdLoan) throw new Error("Error creating loan");
        return createdLoan;
    } catch (error) {
        throw new Error(`Create loan failed: ${error.message}`);
    }
}

async function findAllLoansService() {
    try {
        return await loanRepository.findAllLoansRepository();
    } catch (error) {
        throw new Error(`Find all loans failed: ${error.message}`);
    }
}

async function findLoanByIdService(loanId) {
    try {
        if (!loanId) {
            throw new Error("Missing loanId");
        }
        const loan = await loanRepository.findLoanByIdRepository(loanId);
        if (!loan) throw new Error("Loan not found");
        return loan;
    } catch (error) {
        throw new Error(`Find loan by ID failed: ${error.message}`);
    }
}


async function deleteLoanService(loanId, userId) {
    try {
        if (!loanId || !userId) {
            throw new Error("Missing required parameters");
        }
        const loan = await loanRepository.findLoanByIdRepository(loanId);
        if (!loan) throw new Error("Loan not found");
        if (loan.userId !== userId) throw new Error("Unauthorized");
        const response = await loanRepository.deleteLoanRepository(loanId);
        return response;
    } catch (error) {
        throw new Error(`Delete loan failed: ${error.message}`);
    }
}

export default {
    createLoanService,
    findAllLoansService,
    findLoanByIdService,
    deleteLoanService
};
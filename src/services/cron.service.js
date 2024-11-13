import cron from 'node-cron';
import sendEmail from './email.service.js';
import loanRepository from '../repositories/loan.repository.js';
import bookRepository from '../repositories/book.repository.js';
import userRepository from '../repositories/user.repository.js';
import moment from 'moment';

cron.schedule('0 9 * * *', async () => {
  const loans = await loanRepository.findAllLoansRepository();
  const today = moment().startOf('day');

  loans.forEach(async (loan) => {
    const dueDate = moment(loan.dueDate).startOf('day');
    const reminderDueDate = moment(dueDate).subtract(1, 'days');
    const userLoan = await userRepository.findUserByIdRepository(loan.userId);
    const bookLoan = await bookRepository.findBookByIdRepository(loan.bookId);
    if (today.isSame(reminderDueDate)) {
      sendEmail(userLoan.email, bookLoan.title, loan.dueDate);
    };
  });
});
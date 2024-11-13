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
    if (today.isSame(reminderDueDate)) {
      sendEmail(loans.email, loans.title, loan.dueDate);
    };
  });
});
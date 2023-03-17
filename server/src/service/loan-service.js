import ApiError from "../exceptions/api-error.js";
import loanModel from "../models/loan-model.js";
import userModel from "../models/user-model.js";

class LoanService {
    async addLoan(loanData) {
        await this.borrowerExists(loanData.borrowerId);
        const loan = await loanModel.create({
            amount: loanData.amount,
            term: loanData.term,
            name: loanData.name,
            borrowerId: loanData.borrowerId,
            addedDate: new Date(),
        });

        return loan;
    }
    async getBorrowerLoans(borrowerId) {
        await this.borrowerExists(borrowerId);
        const loans = await loanModel.find({ borrowerId });
        return loans;
    }
    async borrowerExists(borrowerId) {
        const borrower = await userModel.findById(borrowerId);
        if (!borrower) {
            throw ApiError.BadRequest(`Borrower with id ${borrowerId} doesn't exists!`);
        }
    }
}

export default new LoanService();

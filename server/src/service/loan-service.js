import ApiError from "../exceptions/api-error.js";
import loanModel from "../models/loan-model.js";
import userModel from "../models/user-model.js";

class LoanService {
    async addLoan(loanData) {
        const borrower = await userModel.findById(loanData.userId);
        if (!borrower) {
            throw ApiError.BadRequest(`Borrower with id ${loanData.userId} doesn't exists!`);
        }
        const loan = await loanModel.create({
            amount: loanData.amount,
            term: loanData.term,
            name: loanData.name,
            userId: loanData.userId,
            addedDate: new Date(),
        });

        return loan;
    }
}

export default new LoanService();

import ApiError from "../exceptions/api-error.js";
import blockModel from "../models/block-model.js";
import loanModel from "../models/loan-model.js";
import userModel from "../models/user-model.js";

class LoanService {
    async addLoan(loanData) {
        await this.borrowerExists(loanData.borrowerId);
        await this.canAddLoan(loanData.borrowerId);
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
    async canAddLoan(borrowerId) {
        const lastAddedLoans = await loanModel.find({ borrowerId }).sort({ addedDate: 1 }).limit(1);
        if (lastAddedLoans.length > 0) {
            const lastLoan = lastAddedLoans[0];
            const diffHours = Math.abs(lastLoan.addedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60);
            if (diffHours < 24) {
                const blockedData = await blockModel.findOne({ userId: borrowerId });
                if (blockedData) {
                    blockedData.warningCount++;
                    if (blockedData.warningCount >= 3) {
                        blockedData.isBlocked = true;
                        blockedData.save();
                        throw ApiError.BadRequest("You achieved warning count limit! Now you are blocked, please, connect with administration to be unblocked!");
                    } else {
                        blockedData.save();
                        throw ApiError.BadRequest(`Warning! You can apply loan only once in 24 hours. You have ${3 - blockedData.warningCount} attempt(s) left.`);
                    }
                }
                const blocked = await blockModel.create({ userId: borrowerId });
                throw ApiError.BadRequest(`Warning! You can apply loan only once in 24 hours. You have 3 attempts left.`);
            }
        }
    }
    async unblockBorrower(borrowerId) {
        await this.borrowerExists(borrowerId);

        const blockedBorrower = await blockModel.findOne({ userId: borrowerId });
        if (blockedBorrower) {
            blockedBorrower.isBlocked = false;
            blockedBorrower.warningCount = 0;
            return blockedBorrower.save();
        }
    }
}

export default new LoanService();

import LoanDto from "../dtos/loan-dto.js";
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
        return new LoanDto(loan);
    }
    async getBorrowerLoans(borrowerId) {
        await this.borrowerExists(borrowerId);
        const loansData = await loanModel.find({ borrowerId });
        const loans = loansData.map((loan) => new LoanDto(loan));

        return loans;
    }
    async borrowerExists(borrowerId) {
        const borrower = await userModel.findById(borrowerId);
        if (!borrower) {
            throw ApiError.BadRequest(`Borrower with id ${borrowerId} doesn't exists!`);
        }
    }
    async canAddLoan(borrowerId) {
        const lastAddedLoans = await loanModel.find({ borrowerId }).sort({ addedDate: -1 }).limit(1);
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
    async getEqualSharesShedule(loanId) {
        const loanData = await loanModel.findById(loanId);
        if (!loanData) throw ApiError.BadRequest("This loan doesn't exist");

        const loan = new LoanDto(loanData);

        const shedule = [];

        const A = loan.amount;
        const R = loan.monthlyInterestRate;
        const T = loan.term;
        const D_start = loan.addedDate;
        const paymentMonthAmount = Math.round(((A * (R * Math.pow(1 + R, T))) / (Math.pow(1 + R, T) - 1)) * 100) / 100;

        for (let i = 1; i <= T; i++) {
            const monthCount = D_start.getMonth() + i;
            const newDate = new Date(D_start).setMonth(monthCount);
            const paymentDate = new Date(newDate);

            var outstandingBalance = A;
            if (shedule.length > 0) {
                const lastNote = shedule[shedule.length - 1];
                outstandingBalance = Math.round((lastNote.outstandingBalance - lastNote.principalPayment) * 100) / 100;
            }
            var paymentAmount = paymentMonthAmount;

            const accruedInterest = Math.round(outstandingBalance * R * 100) / 100;
            var principalPayment = Math.round((paymentAmount - accruedInterest) * 100) / 100;

            if (i == T && outstandingBalance - principalPayment != 0) {
                paymentAmount = outstandingBalance + accruedInterest;
                principalPayment = outstandingBalance;
            }

            shedule.push({
                paymentNum: i,
                paymentDate,
                outstandingBalance,
                accruedInterest,
                principalPayment,
                paymentAmount,
            });
        }

        return shedule;
    }
    async getDifferentiatedPaymentShedule(loanId) {
        const loanData = await loanModel.findById(loanId);
        if (!loanData) throw ApiError.BadRequest("This loan doesn't exist");

        const loan = new LoanDto(loanData);

        const shedule = [];

        const A = loan.amount;
        const R = loan.monthlyInterestRate;
        const T = loan.term;
        const D_start = loan.addedDate;
        const PP = Math.round((A / T) * 100) / 100;

        for (let i = 1; i <= T; i++) {
            const monthCount = D_start.getMonth() + i;
            const newDate = new Date(D_start).setMonth(monthCount);
            const paymentDate = new Date(newDate);

            var outstandingBalance = A;
            if (shedule.length > 0) {
                const lastNote = shedule[shedule.length - 1];
                outstandingBalance = Math.round((lastNote.outstandingBalance - lastNote.principalPayment) * 100) / 100;
            }

            const accruedInterest = Math.round(outstandingBalance * R * 100) / 100;
            var paymentAmount = accruedInterest + PP;
            var principalPayment = PP;
            if (i == T && outstandingBalance - PP != 0) {
                paymentAmount = outstandingBalance + accruedInterest;
                principalPayment = outstandingBalance;
            }

            shedule.push({
                paymentNum: i,
                paymentDate,
                outstandingBalance,
                accruedInterest,
                principalPayment,
                paymentAmount,
            });
        }

        return shedule;
    }
}

export default new LoanService();

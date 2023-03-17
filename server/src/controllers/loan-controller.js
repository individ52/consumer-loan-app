import loanService from "../service/loan-service.js";

class LoanController {
    async apply(req, res, next) {
        try {
            const loan = req.body;
            const loanData = await loanService.addLoan(loan);

            return res.json(loanData);
        } catch (e) {
            next(e);
        }
    }
}

export default new LoanController();

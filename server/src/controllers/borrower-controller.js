import loanService from "../service/loan-service.js";

class BorrowerController {
    async getLoans(req, res, next) {
        try {
            const { borrowerId } = req.params;
            const loans = await loanService.getBorrowerLoans(borrowerId);

            return res.json(loans);
        } catch (e) {
            next(e);
        }
    }
    async unblock(req, res, next) {
        try {
            const { borrowerId } = req.params;

            await loanService.unblockBorrower(borrowerId);

            return res.json({ message: "User is successfully unblocked!" });
        } catch (e) {
            next(e);
        }
    }
}

export default new BorrowerController();

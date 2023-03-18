import ApiError from "../exceptions/api-error.js";
import blockModel from "../models/block-model.js";
import loanModel from "../models/loan-model.js";
import tokenService from "../service/token-service.js";

export default async function (req, res, next) {
    try {
        const { loanId } = req.params;
        const loanData = await loanModel.findById(loanId);

        if (loanData.borrowerId != req.user.id) {
            return next(ApiError.BadRequest("You have not access to this loan!"));
        }

        next();
    } catch (e) {
        return next(ApiError.BadRequest("You have not access to this loan!"));
    }
}

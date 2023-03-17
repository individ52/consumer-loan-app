import ApiError from "../exceptions/api-error.js";
import blockModel from "../models/block-model.js";
import tokenService from "../service/token-service.js";

export default async function (req, res, next) {
    try {
        const isBlockedUser = await blockModel.findOne({ userId: req.user.id, isBlocked: true });

        if (isBlockedUser) {
            return next(ApiError.BadRequest("User is blocked!"));
        }

        next();
    } catch (e) {
        return next(ApiError.BadRequest("User is blocked!"));
    }
}

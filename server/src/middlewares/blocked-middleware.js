import ApiError from "../exceptions/api-error.js";
import blockModel from "../models/block-model.js";
import tokenService from "../service/token-service.js";

export default async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;

        const accessToken = authorizationHeader.split(" ")[1];

        const userData = tokenService.validateAccessToken(accessToken);

        const isBlockedUser = await blockModel.findOne({ userId: userData.id, isBlocked: true });

        if (isBlockedUser) {
            return next(ApiError.BadRequest("User are blocked!"));
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.BadRequest("User are blocked!"));
    }
}

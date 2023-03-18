import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import loanController from "../controllers/loan-controller.js";
import blockedMiddleware from "../middlewares/blocked-middleware.js";
import loanAccessMiddleware from "../middlewares/loan-access-middleware.js";

const loanRouter = new Router();

loanRouter.post("/clear/user", authMiddleware, loanController.apply);
loanRouter.post("/clear/token", authMiddleware, loanController.apply);
loanRouter.post("/clear/block", authMiddleware, loanController.apply);
loanRouter.post("/clear/loan", authMiddleware, loanController.apply);

export default loanRouter;

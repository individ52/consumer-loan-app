import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import loanController from "../controllers/loan-controller.js";
import blockedMiddleware from "../middlewares/blocked-middleware.js";
import loanAccessMiddleware from "../middlewares/loan-access-middleware.js";

const loanRouter = new Router();

loanRouter.post("/loan/apply", authMiddleware, blockedMiddleware, loanController.apply);
loanRouter.get("/loan/:loanId/equal-shares-shedule", authMiddleware, loanAccessMiddleware, loanController.getEqualSharesShedule);
loanRouter.get("/loan/:loanId/differentiated-payment-shedule", authMiddleware, loanAccessMiddleware, loanController.getDifferentiatedPaymentShedule);

export default loanRouter;

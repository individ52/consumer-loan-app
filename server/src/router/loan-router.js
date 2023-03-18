import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import loanController from "../controllers/loan-controller.js";
import blockedMiddleware from "../middlewares/blocked-middleware.js";

const loanRouter = new Router();

loanRouter.post("/loan/apply", authMiddleware, blockedMiddleware, loanController.apply);
loanRouter.get("/loan/:loanId/equal-shares-shedule", authMiddleware, loanController.getEqualSharesShedule);

export default loanRouter;

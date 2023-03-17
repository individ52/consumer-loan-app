import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import loanController from "../controllers/loan-controller.js";

const loanRouter = new Router();

loanRouter.post("/loan/apply", authMiddleware, loanController.apply);

export default loanRouter;

import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import loanController from "../controllers/loan-controller.js";

const loan = new Router();

loan.post("/loan/apply", authMiddleware, loanController.apply);

export default loan;

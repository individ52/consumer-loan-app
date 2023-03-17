import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import borrowerController from "../controllers/borrower-controller.js";

const borrowerRouter = new Router();

borrowerRouter.get("/borrower/:borrowerId/loans", authMiddleware, borrowerController.getLoans);

export default borrowerRouter;

import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import borrowerController from "../controllers/borrower-controller.js";

const borrowerRouter = new Router();

borrowerRouter.get("/borrower/:borrowerId/loans", authMiddleware, borrowerController.getLoans);
borrowerRouter.get("/borrower/:borrowerId/unblock", authMiddleware, borrowerController.unblock);

export default borrowerRouter;

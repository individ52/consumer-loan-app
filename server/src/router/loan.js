import { Router } from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const loan = new Router();

loan.get("/users", authMiddleware, userController.getUsers);

export default loan;

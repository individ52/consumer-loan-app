import { Router } from "express";
import { body } from "express-validator";
import userController from "../controllers/user-controller.js";

const userRouter = new Router();

userRouter.post("/registration", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), userController.registration);
userRouter.post("/login", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);

export default userRouter;

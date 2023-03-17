import { Router } from "express";
import { body } from "express-validator";
import userController from "../../src/controllers/user-controller.js";

const authorization = new Router();

authorization.post("/registration", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), userController.registration);
authorization.post("/login", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), userController.login);
authorization.post("/logout", userController.logout);
authorization.get("/refresh", userController.refresh);

export default authorization;

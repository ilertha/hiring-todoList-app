import { Router } from "express";
import { AuthValidator } from "../validators";
import { AuthController } from "../controllers";

export const authRouter = Router()

authRouter.post(
  "/register",
  AuthValidator.registerValidator(),
  AuthController.registerController
);

authRouter.post(
  "/login",
  AuthValidator.loginValidator(),
  AuthController.loginController
)

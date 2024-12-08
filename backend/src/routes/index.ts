import { authRouter } from "./authRouter";
import { Router } from "express";
import { todoListRouter } from "./todoListRouter";
export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/todoList", todoListRouter)

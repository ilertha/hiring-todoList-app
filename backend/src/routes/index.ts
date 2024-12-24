import { authRouter } from "./authRouter";
import { listRouter } from "./listRouter";
import { Router } from "express";

export const appRouter = Router()

appRouter.use('/auth',authRouter)
appRouter.use('/list',listRouter)
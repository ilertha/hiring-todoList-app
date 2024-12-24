import { NextFunction, Request, Response } from "express";
import { Env } from "../env";
import jwt from "jsonwebtoken";
import { PayloadType } from "../type";
import { userService } from "../services";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const checkAuth = async (req , res, next: NextFunction) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const { secretKey } = Env;
    const { uuid } = jwt.verify(token, secretKey||"express") as PayloadType;
    const user = await userService.getOneUser({ uuid });
    req.user = { ...user };
    next();
  } catch {
    next(new UnauthorizedError("Token is invalid"));
  }
};

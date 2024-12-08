import { NextFunction } from "express";
import { Env } from "../env";
import jwt from "jsonwebtoken";
import { PayloadType } from "../types";
import { userService } from "../services";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const checkAuth = async (req, _res, next: NextFunction) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const { secretKey } = Env;
    const { id } = jwt.verify(token, secretKey) as PayloadType;
    const user = await userService.getOneUser({ id });
    req.user = { ...user };
    next();
  } catch {
    next(new UnauthorizedError("Token is invalid"));
  }
};

import { Request, Response } from "express";
import { errorHandlerWrapper } from "../../utils";

const signout = (req: Request, res: Response) => {
  return res.json({message: "Signed out"});
}

export const logoutController = errorHandlerWrapper(signout);

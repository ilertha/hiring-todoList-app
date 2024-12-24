import { Request, Response } from "express";
import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils";
import httpStatus from "http-status";

const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    username,
    email,
    password:hashPassword
  })
  res.json({user}).status(httpStatus.CREATED)
}

export const registerController = errorHandlerWrapper(registerHandler);
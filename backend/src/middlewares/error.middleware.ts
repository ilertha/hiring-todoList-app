import { ArgumentValidationError, CustomError } from "../errors";
import { Logger } from "../utils";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(JSON.stringify(error));

  if (error instanceof CustomError) {
    if(error instanceof ArgumentValidationError) {
      res.status(error.errorCode).json({
        message: error.message,
        messages: error.messages
      })
    }
    else res.status(error.errorCode).json({
      message: error.message,
    });
  }

  return;
};

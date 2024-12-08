import { ArgumentValidationError } from "../errors";
import { NextFunction, Response, Request } from "express";
import { ValidationError, validationResult } from "express-validator";

export const errorHandlerWrapper = (
  func: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ArgumentValidationError(
          "Arguments are invalid.",
          errors.array().map((error: ValidationError) => error.msg)
        );
      }
      await func(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
};

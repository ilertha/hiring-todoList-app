import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("username").notEmpty().withMessage("Name is required."),
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email is invalid."),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};


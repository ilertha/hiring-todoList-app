import { body } from "express-validator";

export const loginValidator = () => {
  return [
    body("email")
      .exists()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email is invalid."),
    body("password").exists().withMessage("Password is required."),
  ];
};

import { body } from "express-validator";

export const createTitleValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required.")
  ];
};

import { check } from "express-validator";

const login = [
  check("email")
    .notEmpty()
    .withMessage("email can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("password can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
];

export const validate = {
  login,
};

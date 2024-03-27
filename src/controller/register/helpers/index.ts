import { check } from "express-validator";

const insert = [
  check("username")
    .notEmpty()
    .withMessage("username can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
  check("email")
    .notEmpty()
    .withMessage("email can't be empty")
    .isString()
    .withMessage("the type is a string")
    .isEmail()
    .withMessage("Invalid email address")
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
const code = [
  check("email")
    .notEmpty()
    .withMessage("email can't be empty")
    .isString()
    .withMessage("the type is a string")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .escape(),
];
// parameter validation
export const validate = {
  code,
  insert,
};

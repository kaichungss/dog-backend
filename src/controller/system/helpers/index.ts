import { check } from "express-validator";

const list = [
  check("currentPage")
    .notEmpty()
    .withMessage("page can't be empty")
    .isInt({min: 1})
    .withMessage("a type integer with a minimum value of 1"),
  check("limit")
    .notEmpty()
    .withMessage("limit can't be empty")
    .isInt({min: 1})
    .withMessage("a type integer with a minimum value of 1"),
  check("name")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
];

const insert = [
  check("name")
    .notEmpty()
    .withMessage("name can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
  check("describe")
    .notEmpty()
    .withMessage("describe can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
  check("image")
    .notEmpty()
    .withMessage("image can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
];
const click = [
  check("dog_id")
    .notEmpty()
    .withMessage("dog_id can't be empty")
    .trim()
    .escape(),
];
const comment = [
  check("dog_id")
    .notEmpty()
    .withMessage("dog_id can't be empty")
    .trim()
    .escape(),
  check("comment")
    .notEmpty()
    .withMessage("comment can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
];

export const validate = {
  list, insert, click, comment
};

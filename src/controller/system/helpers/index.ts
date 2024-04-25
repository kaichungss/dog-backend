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
    .isLength({min: 1, max: 100})
    .withMessage('Name must be between 1 and 50 characters')
    .trim()
    .escape(),
  check("breed")
    .notEmpty()
    .withMessage("breed can't be empty")
    .isString()
    .withMessage("the type is a string")
    .isLength({min: 1, max: 100})
    .withMessage('Name must be between 1 and 50 characters')
    .trim()
    .escape(),
  check("describe")
    .notEmpty()
    .withMessage("describe can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
  check("image_list")
    .notEmpty()
    .withMessage("image_list can't be empty")
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
const chat = [
  check("receive_id")
    .notEmpty()
    .withMessage("receive_id can't be empty")
    .trim()
    .escape(),
  check("text")
    .notEmpty()
    .withMessage("text can't be empty")
    .isString()
    .withMessage("the type is a string")
    .trim()
    .escape(),
];
export const validate = {
  list, insert, click, comment, chat
};

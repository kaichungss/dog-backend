import type { NextFunction, Request, Response } from "express";
import { handleError } from "@/utils/stateHandle";

const {validationResult} = require("express-validator");

// parameter verification result
export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    handleError(res, result.array()[0].msg, 201)
    return;
  }
  return next();
};

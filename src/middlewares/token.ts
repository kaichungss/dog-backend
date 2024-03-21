import type { NextFunction, Request, Response } from "express";
import { authorityError } from "@/utils/stateHandle";
import { JWT } from "@/utils/JWT";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (JWT.verify(req)) {
      return next();
    } else {
      return authorityError(res);
    }
  } catch (err) {
    return authorityError(res);
  }
};

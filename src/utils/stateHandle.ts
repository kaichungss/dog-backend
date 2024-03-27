import type { Response } from "express";
// response info
export const handleError = (
  res: Response,
  err: string | unknown,
  code?: number
) => {
  res.status(200).json({
    code: code || 500,
    msg: err,
    data: {},
  });
};

export const authorityError = (
  res: Response
) => {
  res.status(403).json({});
};

export const handleSucceed = (
  res: Response,
  data: any,
  msg: string = "success",
  code?: number
) => {
  res.status(200).json({
    code: code || 200,
    msg,
    data,
  });
};

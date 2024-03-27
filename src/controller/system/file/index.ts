import { Request, Response } from "express";
import { handleError, handleSucceed } from "@/utils/stateHandle";

export const file = async (req: Request, res: Response) => {
  // if the file exists
  if (!req.file) {
    handleError(res, 'No file uploaded')
    return
  }
  handleSucceed(res, req.file.filename);
};

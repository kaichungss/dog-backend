import { Request, Response } from "express";
import { handleError, handleSucceed } from "@/utils/stateHandle";

/**
 * Handles the user search request, validates user information, and returns the corresponding result.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - No return value.
 */
export const file = async (req: Request, res: Response) => {
  // if the file exists
  if (!req.file) {
    handleError(res, 'No file uploaded')
    return
  }
  handleSucceed(res, req.file.filename);
};

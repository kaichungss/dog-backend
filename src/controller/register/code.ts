import myCache from "@/middlewares/cache";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { generateSixDigitCode } from "@/utils/utils";
import type { Request, Response } from "express";
import { getInfoByEmail } from "@/model/userModel";

export const code = async (req: Request, res: Response) => {
  const {email} = req.body;
  const count = await getInfoByEmail(email);
  if (count > 0) {
    handleError(res, "the email address is registered", 201);
    return;
  }
  const newVar = myCache.get(email);
  if (newVar) {
    handleError(res, "cannot click within 60 seconds", 201);
    return;
  }
  const code = generateSixDigitCode();
  myCache.set(email, code, 60);
  handleSucceed(res, code);
};

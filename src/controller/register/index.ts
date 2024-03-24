import { Request, Response } from "express";
import { getInfoByEmail, insertData } from "@/model/userModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import myCache from "@/middlewares/cache";
import { generateSixDigitCode, md5Hash } from "@/utils/utils";

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

export const insert = async (req: Request, res: Response) => {
  const {username, email, password, role, code} = req.body;
  const val = myCache.get(email);
  if (!val || val != code) {
    handleError(res, "the registration code is incorrect", 201);
    return;
  }

  const count = await getInfoByEmail(email);
  if (count > 0) {
    handleError(res, "the email address is registered", 201);
    return;
  }
  await insertData({username, email, password: md5Hash(password), role, insert_time: new Date()});
  handleSucceed(res, "success");
};

import { handleError, handleSucceed } from "@/utils/stateHandle";
import type { Request, Response } from "express";
import { getInfoByEmail, insertData } from "@/model/userModel";
import { md5Hash } from "@/utils/utils";
import myCache from "@/middlewares/cache";

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

import { Request, Response } from "express";
import { getInfoByEmailAndPassword } from "@/model/userModel";
import { md5Hash } from "@/utils/utils";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { JWT } from "@/utils/JWT";

export const search = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const info = await getInfoByEmailAndPassword({email, password: md5Hash(password)});
  if (!info.length) {
    handleError(res, "the email address or password is incorrect", 201);
    return;
  }
  const token = JWT.generate(info[0], 60 * 60 + "s");
  handleSucceed(res, {token, username: info[0].username});
};

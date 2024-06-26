import { Request, Response } from "express";
import { getInfoByEmailAndPassword } from "@/model/userModel";
import { md5Hash } from "@/utils/utils";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { JWT } from "@/utils/JWT";

/**
 * Handles the user search request, validates user information, and returns the corresponding result.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - No return value.
 */
export const search = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const info = await getInfoByEmailAndPassword({email, password: md5Hash(password)});
  if (!info.length) {
    handleError(res, "the email address or password is incorrect", 201);
    return;
  }
  const token = JWT.generate(info[0], 60 * 60 + "s");
  handleSucceed(res, {
    token,
    email: info[0].email,
    username: info[0].username,
    role: info[0].role,
    id: info[0].id,
    org_id: info[0].org_id
  });
};

export const is_login = async (req: Request, res: Response) => {
  const verify = JWT.verify(req);
  handleSucceed(res, verify != null);
};

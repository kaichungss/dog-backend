import { Request, Response } from "express";
import { getInfoByEmail, getOrgCountById, getOrgName, insertData, updateInfo } from "@/model/userModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import myCache from "@/middlewares/cache";
import { generateSixDigitCode, md5Hash } from "@/utils/utils";
import { JWT } from "@/utils/JWT";

/**
 * Handles the user search request, validates user information, and returns the corresponding result.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - No return value.
 */
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
  const {username, email, password, role, code, org_id} = req.body;
  if (role == 'worker') {
    const orgInfo = await getOrgCountById(org_id);
    if (orgInfo[0].code != code) {
      handleError(res, "the registration code is incorrect", 201);
      return;
    }
  }
  const count = await getInfoByEmail(email);
  if (count > 0) {
    handleError(res, "the email address is registered", 201);
    return;
  }
  await insertData({username, email, password: md5Hash(password), role, org_id, insert_time: new Date()});
  handleSucceed(res, "success");
};
/**
 * Handles the user search request, validates user information, and returns the corresponding result.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - No return value.
 */
export const updateUser = async (req: Request, res: Response) => {
  const {username, role, code, org_id} = req.body;
  const verify = JWT.verify(req);
  if (role == 'worker') {
    const orgInfo = await getOrgCountById(org_id);
    if (orgInfo[0].code != code) {
      handleError(res, "the registration code is incorrect", 201);
      return;
    }
  }
  await updateInfo({username, role, org_id}, verify.id);
  handleSucceed(res, "success");
};

export const orgName = async (req: Request, res: Response) => {
  const data = await getOrgName();
  handleSucceed(res, data);
};

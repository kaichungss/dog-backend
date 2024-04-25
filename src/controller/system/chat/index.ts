import { Request, Response } from "express";
import { JWT } from "@/utils/JWT";
import { chatInfo, insertChat, users } from "@/model/operateInfoModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";


export const list = async (req: Request, res: Response) => {
  try {
    const verify = JWT.verify(req);
    const {receivedId} = req.body;
    const list = await chatInfo(verify.id, receivedId);
    handleSucceed(res, list, "success");
  } catch (error) {
    handleError(res, error);
  }
};

export const addChat = async (req: Request, res: Response) => {
  const {receive_id, text} = req.body;
  const verify = JWT.verify(req);
  await insertChat({sender_id: verify.id, receive_id, text, insert_time: new Date()});
  handleSucceed(res, "success");
};

export const userList = async (req: Request, res: Response) => {
  try {
    const verify = JWT.verify(req);
    const {name} = req.body;
    const list = await users(verify.id,name);
    handleSucceed(res, list, "success");
  } catch (error) {
    handleError(res, error);
  }
};

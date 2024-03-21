import { handleSucceed } from "@/utils/stateHandle";
import type { Request, Response } from "express";
import { insertData } from "@/model/clickInfoModel";
import { JWT } from "@/utils/JWT";

export const click = async (req: Request, res: Response) => {
  const {dog_id} = req.body;
  const verify = JWT.verify(req);
  await insertData({dog_id, operate_id: verify.id, insert_time: new Date()});
  handleSucceed(res, "success");
}

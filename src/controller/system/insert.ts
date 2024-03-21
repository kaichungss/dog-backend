import { handleSucceed } from "@/utils/stateHandle";
import type { Request, Response } from "express";
import { insertData } from "@/model/dogInfoModel";
import { JWT } from "@/utils/JWT";

export const insert = async (req: Request, res: Response) => {
  const {name, describe, image} = req.body;
  const verify = JWT.verify(req);

  await insertData({
    name,
    describe,
    image: decodeURIComponent(image),
    insert_time: new Date(),
    update_time: new Date(),
    operate_id: verify.id
  });
  handleSucceed(res, "success");
};

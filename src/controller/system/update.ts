import { handleSucceed } from "@/utils/stateHandle";
import type { Request, Response } from "express";
import { updateData } from "@/model/dogInfoModel";

export const update = async (req: Request, res: Response) => {
  const {id, name, describe, image} = req.body;
  await updateData(id, {
    name,
    describe,
    image: decodeURIComponent(image),
    update_time: new Date()
  });
  handleSucceed(res, "success");
};

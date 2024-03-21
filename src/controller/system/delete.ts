import { deleteData } from "@/model/dogInfoModel";
import { handleSucceed } from "@/utils/stateHandle";
import type { Request, Response } from "express";

export const delData = async (req: Request, res: Response) => {
  const {id} = req.query;
  await deleteData(Number(id));
  handleSucceed(res, "success");
};

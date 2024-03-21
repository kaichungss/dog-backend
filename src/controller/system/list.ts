import type {Request, Response} from "express";
import {handleError, handleSucceed} from "@/utils/stateHandle";
import {getAllData, getCount} from "@/model/dogInfoModel";

export const list = async (req: Request, res: Response) => {
  try {
    const {currentPage, limit, name} = req.body;
    const params = {page: currentPage, limit: limit, name: String(name || '')};
    const count = await getCount(params);
    const allData = await getAllData(params);
    const send = {
      list: allData,
      count: count,
    };
    handleSucceed(res, send, "success");
  } catch (error) {
    handleError(res, error);
  }
};

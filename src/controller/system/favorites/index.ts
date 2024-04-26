import { Request, Response } from "express";
import { JWT } from "@/utils/JWT";
import {
  deleteFavoritesData,
  getAllFavoritesData,
  getFavoritesCount,
  insertFavoritesData
} from "@/model/operateInfoModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";

// favorites data
export const list = async (req: Request, res: Response) => {
  try {
    const verify = JWT.verify(req);
    const {currentPage, limit, name, size, breed} = req.body;
    const params = {id: verify.id,page: currentPage, limit: limit, name: String(name || ''), size, breed};
    const count = await getFavoritesCount(params);
    const allData = await getAllFavoritesData(params);
    const send = {
      list: allData,
      count: count,
    };
    handleSucceed(res, send, "success");
  } catch (error) {
    handleError(res, error);
  }
};

export const moreList = async (req: Request, res: Response) => {
  try {
    const verify = JWT.verify(req);
    const {currentPage, limit, name} = req.body;
    const params = {id: verify.id, page: currentPage, limit: limit, name: String(name || '')};
    const allData = await getAllFavoritesData(params);
    handleSucceed(res, allData, "success");
  } catch (error) {
    handleError(res, error);
  }
};

export const favorites = async (req: Request, res: Response) => {
  const {dog_id, f} = req.body;
  const verify = JWT.verify(req);
  // If you like it, insert it, and delete it if you don't like it
  if (f) {
    await insertFavoritesData({dog_id, operate_id: verify.id, insert_time: new Date()});
  } else {
    await deleteFavoritesData(dog_id, verify.id);
  }

  handleSucceed(res, "success");
}

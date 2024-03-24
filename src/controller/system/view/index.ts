import { Request, Response } from "express";
import { JWT } from "@/utils/JWT";
import { commentData, insertClickData, insertCommentData } from "@/model/operateInfoModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { getAllViewData, getCount } from "@/model/dogInfoModel";

export const click = async (req: Request, res: Response) => {
  const {dog_id} = req.body;
  const verify = JWT.verify(req);
  await insertClickData({dog_id, operate_id: verify.id, insert_time: new Date()});
  handleSucceed(res, "success");
}

export const list = async (req: Request, res: Response) => {
  try {
    const {currentPage, limit, name} = req.body;
    const params = {page: currentPage, limit: limit, name: String(name || '')};
    const count = await getCount(params);
    const allData = await getAllViewData(params);
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
    const {currentPage, limit, name} = req.body;
    const params = {page: currentPage, limit: limit, name: String(name || '')};
    const allData = await getAllViewData(params);
    handleSucceed(res, allData, "success");
  } catch (error) {
    handleError(res, error);
  }
};


export const commentInfo = async (req: Request, res: Response) => {
  const {dog_id} = req.body;
  const allData = await commentData(dog_id);
  handleSucceed(res, allData);
}
export const comment = async (req: Request, res: Response) => {
  const {dog_id, comment} = req.body;
  const verify = JWT.verify(req);
  await insertCommentData({dog_id, operate_id: verify.id, insert_time: new Date(), comment});
  handleSucceed(res, "success");
}

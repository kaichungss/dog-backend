import { Request, Response } from "express";
import { JWT } from "@/utils/JWT";
import { commentData, deleteCommentDataById, insertClickData, insertCommentData } from "@/model/operateInfoModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { getAllViewData, getCount, getDetailData } from "@/model/dogInfoModel";

export const click = async (req: Request, res: Response) => {
  const {dog_id} = req.body;
  const verify = JWT.verify(req);
  await insertClickData({dog_id, operate_id: verify.id, insert_time: new Date()});
  handleSucceed(res, "success");
}

export const list = async (req: Request, res: Response) => {
  try {
    const verify = JWT.verify(req);
    const {currentPage, limit, name, size, breed} = req.body;
    const params = {page: currentPage, limit: limit, name: String(name || ''), size, breed};
    const count = await getCount(params);
    const allData = await getAllViewData({...params, ...{id: verify.id}});
    const send = {
      list: allData,
      count: count,
    };
    handleSucceed(res, send, "success");
  } catch (error) {
    handleError(res, error);
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const {id} = req.body;
    const allData = await getDetailData(id);
    handleSucceed(res, allData, "success");
  } catch (error) {
    handleError(res, error);
  }
};

export const moreList = async (req: Request, res: Response) => {
  try {
    const verify = JWT.verify(req);
    const {currentPage, limit, name, size, breed} = req.body;
    const params = {id: verify.id,page: currentPage, limit: limit, name: String(name || ''), size, breed};
    const allData = await getAllViewData(params);
    handleSucceed(res, allData, "success");
  } catch (error) {
    handleError(res, error);
  }
};

// review data
export const commentInfo = async (req: Request, res: Response) => {
  const {dog_id} = req.body;
  const allData = await commentData(dog_id);
  handleSucceed(res, allData);
}
export const comment = async (req: Request, res: Response) => {
  const {dog_id, comment} = req.body;
  const verify = JWT.verify(req);
  const data = await insertCommentData({dog_id, operate_id: verify.id, insert_time: new Date(), comment});
  handleSucceed(res, data);
}

export const deleteComment = async (req: Request, res: Response) => {
  const {id} = req.body;
  await deleteCommentDataById(id);
  handleSucceed(res, "success");
}

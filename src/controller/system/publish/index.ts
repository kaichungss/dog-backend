import { Request, Response } from "express";
import { deleteData, getAllData, getCount, insertData, updateData } from "@/model/dogInfoModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { JWT } from "@/utils/JWT";

export const delData = async (req: Request, res: Response) => {
  const {id} = req.query;
  await deleteData(Number(id));
  handleSucceed(res, "success");
};

export const insert = async (req: Request, res: Response) => {
  const {name, describe, image} = req.body;
  const verify = JWT.verify(req);

  await insertData({
    name,
    describe,
    image: image,
    insert_time: new Date(),
    update_time: new Date(),
    operate_id: verify.id
  });
  handleSucceed(res, "success");
};

export const list = async (req: Request, res: Response) => {
  try {
    const {currentPage, limit, name} = req.body;
    const verify = JWT.verify(req);
    const params = {page: currentPage, limit: limit, name: String(name || ''), id: verify.id};
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

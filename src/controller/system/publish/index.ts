import { Request, Response } from "express";
import { deleteData, getAllData, getCount, insertData, updateData } from "@/model/dogInfoModel";
import { handleError, handleSucceed } from "@/utils/stateHandle";
import { JWT } from "@/utils/JWT";
import { deleteClickData, deleteCommentDataByDogId } from "@/model/operateInfoModel";

/**
 * Handles the user search request, validates user information, and returns the corresponding result.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - No return value.
 */
export const delData = async (req: Request, res: Response) => {
  const {id} = req.body;
  await deleteData(id);
  await deleteCommentDataByDogId(id);
  await deleteClickData(id)
  handleSucceed(res, "success");
};

export const insert = async (req: Request, res: Response) => {
  const {
    name, breed, describe, image_list, gender,
    color,
    size,
    sterilized,
    vaccinated,
  } = req.body;
  const verify = JWT.verify(req);

  await insertData({
    name,
    gender,
    color,
    size,
    sterilized,
    vaccinated,
    breed,
    describe,
    image_list,
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
    // total
    const count = await getCount(params);
    // paginated data
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
  const {
    id, name, breed, describe, image_list, gender,
    color,
    size,
    sterilized,
    vaccinated,
  } = req.body;
  await updateData(id, {
    name,
    gender,
    color,
    size,
    sterilized,
    vaccinated,
    breed,
    describe,
    image_list,
    update_time: new Date()
  });
  handleSucceed(res, "success");
};

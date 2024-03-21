import express from "express";
import { validate } from "@/controller/system/helpers/";
import { validateResult, validateToken } from "@/middlewares";
import { delData, insert, list } from "@/controller/system";
import '@/model/dogInfoModel'
import { update } from "@/controller/system/update";
import { click } from "@/controller/system/click";

const router = express.Router();
/**,
 * @swagger
 * /dog_info/list:
 *    get:
 *      tags:
 *      - dog_info
 *      summary: query all data
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: name
 *        in: query
 *        description: name
 *        required: false
 *        type: string
 *      - name: page
 *        in: query
 *        description: page
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      - name: limit
 *        in: query
 *        description: limit
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 * */
router.post("/list", validateToken, validate.list, validateResult, list);
router.post("/insert", validateToken, validate.insert, validateResult, insert);
router.post("/update", validateToken, validate.insert, validateResult, update);
router.get("/delete", validateToken, delData);
router.post("/click", validateToken, validate.click, validateResult, click);
export default router;

import express from "express";
import { validate } from "@/controller/system/helpers/";
import { validateResult, validateToken } from "@/middlewares";
import { delData, insert, list, update } from "@/controller/system/publish";
import '@/model/dogInfoModel'

const router = express.Router();
/**
 * @swagger
 * /system/publish/list:
 *   post:
 *     summary:
 *     tags: [Publish]
 *     description: dog info list api
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPage:
 *                 type: integer
 *               limit:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/list", validateToken, validate.list, validateResult, list);
router.post("/insert", validateToken, validate.insert, validateResult, insert);
router.post("/update", validateToken, validate.insert, validateResult, update);
router.get("/delete", validateToken, delData);
export default router;

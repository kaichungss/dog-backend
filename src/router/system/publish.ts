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
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Publish]
 *     description: publish list api
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

/**
 * @swagger
 * /system/publish/insert:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Publish]
 *     description: publish insert api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               vaccinated:
 *                 type: string
 *               sterilized:
 *                 type: string
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               breed:
 *                 type: string
 *               gender:
 *                 type: string
 *               describe:
 *                 type: string
 *               image_list:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/insert", validateToken, validate.insert, validateResult, insert);

/**
 * @swagger
 * /system/publish/update:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Publish]
 *     description: publish update api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               vaccinated:
 *                 type: string
 *               sterilized:
 *                 type: string
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               breed:
 *                 type: string
 *               gender:
 *                 type: string
 *               describe:
 *                 type: string
 *               image_list:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/update", validateToken, validate.insert, validateResult, update);

/**
 * @swagger
 * /system/publish/delete:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Publish]
 *     description: publish delete api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post("/delete", validateToken, delData);
export default router;

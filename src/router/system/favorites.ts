import { validateResult, validateToken } from "@/middlewares";
import { validate } from "@/controller/system/helpers";
import { favorites, list, moreList } from "@/controller/system/favorites";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /system/favorites/list:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary: favorites list api
 *     tags: [Favorites]
 *     description: favorites list api
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
 *               size:
 *                 type: array
 *                 items:
 *                   type: string
 *               breed:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/list", validateToken, validate.list, validateResult, list);

/**
 * @swagger
 * /system/favorites/moreList:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Favorites]
 *     description: favorites moreList api
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
 *               size:
 *                 type: array
 *                 items:
 *                   type: string
 *               breed:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/moreList", validateToken, validate.list, validateResult, moreList);
/**
 * @swagger
 * /system/favorites/insert:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Favorites]
 *     description: favorites insert api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dog_id:
 *                 type: integer
 *               f:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/insert", validateToken, validate.click, validateResult, favorites);
export default router;

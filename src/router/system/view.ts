import { validateResult, validateToken } from "@/middlewares";
import { validate } from "@/controller/system/helpers";
import { click, comment, commentInfo, deleteComment, list, moreList } from "@/controller/system/view";
import express from "express";

const router = express.Router();
/**
 * @swagger
 * /system/view/list:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [View]
 *     description: view list api
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
 * /system/view/moreList:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [View]
 *     description: view moreList api
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
router.post("/moreList", validateToken, validate.list, validateResult, moreList);

/**
 * @swagger
 * /system/view/click:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [View]
 *     description: view click api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dog_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/click", validateToken, validate.click, validateResult, click);

/**
 * @swagger
 * /system/view/comment:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [View]
 *     description: view comment api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dog_id:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/comment", validateToken, validate.comment, validateResult, comment);

/**
 * @swagger
 * /system/view/comment_data:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [View]
 *     description: view comment data api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dog_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/comment_data", validateToken, commentInfo);

/**
 * @swagger
 * /system/view/delete_comment:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [View]
 *     description: view delete comment api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/delete_comment", validateToken, deleteComment);
export default router;

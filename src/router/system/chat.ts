import { validateResult, validateToken } from "@/middlewares";
import { addChat, list, userList } from "@/controller/system/chat";
import express from "express";
import { validate } from "@/controller/system/helpers";

const router = express.Router();

/**
 * @swagger
 * /system/chat/list:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Chat]
 *     description: view chat api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receivedId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/list", validateToken, list);

/**
 * @swagger
 * /system/chat/addChat:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Chat]
 *     description: view chat api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receive_id:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/addChat", validateToken, validate.chat, validateResult, addChat);


/**
 * @swagger
 * /system/chat/userList:
 *   post:
 *     security: [{apiKeyAuth: []}]
 *     summary:
 *     tags: [Chat]
 *     description: view chat api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/userList", validateToken, userList);

export default router;

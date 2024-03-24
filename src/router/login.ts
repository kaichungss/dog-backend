import express from "express";
import { validate } from "@/controller/login/helpers/";
import { validateResult } from "@/middlewares";
import { search } from "@/controller/login";

const router = express.Router();
/**
 * @swagger
 * /login:
 *   post:
 *     summary:
 *     tags: [Login]
 *     description: login api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/", validate.login, validateResult, search);

export default router;

import express from "express";
import { validate } from "@/controller/register/helpers";
import { validateResult, validateToken } from "@/middlewares";
import { code, insert, orgName, updateUser } from "@/controller/register";

const router = express.Router();
/**
 * @swagger
 * /register/code:
 *   post:
 *     summary:
 *     tags: [Register]
 *     description: register code api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/code", validate.code, validateResult, code);


/**
 * @swagger
 * /register/insert:
 *   post:
 *     summary:
 *     tags: [Register]
 *     description: register api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: integer
 *               email:
 *                 type: integer
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               code:
 *                 type: string
 *               org_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/insert", validate.insert, validateResult, insert);


/**
 * @swagger
 * /register/orgName:
 *   post:
 *     summary:
 *     tags: [Register]
 *     description: register orgName api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/orgName", orgName);

export default router;

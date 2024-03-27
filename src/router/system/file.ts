import express from "express";
import { upload } from "@/middlewares/file";
import { file } from "@/controller/system/file";
import { validateToken } from "@/middlewares";

const router = express.Router();
/**
 * @swagger
 * /system/file/upload:
 *   post:
 *     tags: [File]
 *     summary:
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
router.post('/upload', validateToken, upload.single('file'), file);
export default router;

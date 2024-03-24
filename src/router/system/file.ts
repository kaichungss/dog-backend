import express from "express";
import { upload } from "@/middlewares/file";
import { file } from "@/controller/system/file";
import { validateToken } from "@/middlewares";

const router = express.Router();
router.post('/upload', validateToken, upload.single('file'), file);
export default router;

import { validateResult, validateToken } from "@/middlewares";
import { validate } from "@/controller/system/helpers";
import { click, comment, commentInfo, list } from "@/controller/system/view";
import express from "express";

const router = express.Router();
router.post("/list", validateToken, validate.list, validateResult, list);
router.post("/click", validateToken, validate.click, validateResult, click);
router.post("/comment", validateToken, validate.comment, validateResult, comment);
router.post("/comment_data", validateToken, commentInfo);
export default router;

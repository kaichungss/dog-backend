import express from "express";
import { validate } from "@/controller/register/helpers";
import { validateResult } from "@/middlewares";
import { code, insert } from "@/controller/register";

const router = express.Router();

router.post("/code", validate.code, validateResult, code);
router.post("/insert", validate.insert, validateResult, insert);
export default router;

import express from "express";
import { validate } from "@/controller/login/helpers/";
import { validateResult } from "@/middlewares";
import { search } from "@/controller/login";

const router = express.Router();
router.post("/", validate.login, validateResult, search);

export default router;

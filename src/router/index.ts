import express from "express";
import register from "@/router/register";
import login from "@/router/login";
import system from "@/router/system";

const router = express.Router();

router.use("/system", system);
router.use("/login", login);
router.use("/register", register);
export default router;

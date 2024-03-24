import express from "express";
import publish from "@/router/system/publish";
import view from "@/router/system/view";
import file from "@/router/system/file";

const router = express.Router();

router.use("/publish", publish);
router.use("/view", view);
router.use("/file", file);
export default router;

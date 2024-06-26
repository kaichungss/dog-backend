import express from "express";
import publish from "@/router/system/publish";
import view from "@/router/system/view";
import file from "@/router/system/file";
import favorites from "./favorites";
import chat from "./chat";


const router = express.Router();

router.use("/publish", publish);
router.use("/view", view);
router.use("/file", file);
router.use("/favorites", favorites);
router.use("/chat", chat);
export default router;

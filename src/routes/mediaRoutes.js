import express from "express";
import { uploadMedia } from "../controllers/uploadController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { deleteMedia, getMediaById } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadMedia);
router.get("/:id", getMediaById);
router.delete("/:id", protect, deleteMedia);
export default router;

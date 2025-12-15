import express from "express";
import { likePost } from "../controllers/likeController.js";
import { unlikePost } from "../controllers/likeController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/:postId/like", protect, likePost);
router.post("/:postId/unlike", protect, unlikePost);
export default router;
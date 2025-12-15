import express from "express";
import { addComment, deleteComment, getCommentsByPostId,updateComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId/comments", protect, addComment);
router.get("/:postId/comments", getCommentsByPostId);
router.put("/:commentId/comments", protect, updateComment);
router.delete("/:commentId/comments", protect, deleteComment);

export default router;
import express from "express";
import { createPost,updatePosts,deletePost ,getPosts} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/ping", (req, res) => {
  res.send("Posts router working");
});
router.put("/:id", protect, updatePosts);
router.delete("/:id", protect, deletePost);

export default router;
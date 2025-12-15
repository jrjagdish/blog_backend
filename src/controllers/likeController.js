import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    //console.log(postId)
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const existingLike = await Like.findOne({
      postId,
      userId: req.user.userId,
    });
    if (existingLike) {
      return res.status(400).json({ message: "Post already liked" });
    }
    const like = new Like({
      postId,
      userId: req.user.userId,
    });
    await like.save();
    await Post.findByIdAndUpdate(
      postId,
      { $inc: { totalLikes: 1 } },
      { new: true }
    );

    return res.status(201).json({ message: "Post liked successfully", like });
  } catch (error) {
    return res.status(500).json({ message: "Server error" + error.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const like = await Like.findOne({ postId, userId: req.user.userId });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }
    await like.deleteOne();
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
    return res.json({ message: "Post unliked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

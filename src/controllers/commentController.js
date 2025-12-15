import Comments from "../models/Comments.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    const { parentId = null, content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const postExists = await Post.findById(req.params.postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = new Comments({
      postId: req.params.postId,
      parentId,
      content,
      userId: req.user.userId,
    });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error adding comment", error: err.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try{
    const {page=1, limit=10} = req.query;
    const skip= (page-1)*limit;
    const postExists = await Post.findById(req.params.postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await Comments.find({ postId: req.params.postId })
    .populate("userId", "username")
      .sort({ createdAt: 1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    const total= await Comments.countDocuments({ postId: req.params.postId });
    res.json({comments, total, page: parseInt(page), pages: Math.ceil(total/limit)});
  }catch(err){
    res
      .status(500)
      .json({ message: "Server error fetching comments", error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    
    const comment = await Comments.findById(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    comment.content = req.body.content;
    await comment.save();
    res.json({ message: "Comment updated successfully", comment: comment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error updating comment", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await comment.deleteOne();
    
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error deleting comment", error: err.message });
  }
};

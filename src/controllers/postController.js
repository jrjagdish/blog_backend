import Post from "../models/Post.js";
import { generateSlug } from "../config/slug.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, featuredImage, tags = [] } = req.body;
    if (!title || !content || !featuredImage) {
      return res
        .status(400)
        .json({ error: "Title, content, and featured image are required." });
    }
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (await Post.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }
    const post = new Post({
      title,
      content,
      slug,
      authorId: req.user.userId,
      featuredImage,
      tags,
      published: new Date(),
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const posts = await Post.find().sort({ published: -1 }).skip(parseInt(skip)).limit(parseInt(limit)).populate("authorId", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updatePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    if (post.authorId.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized." });
    }
    const { title, content, featuredImage, tags } = req.body;
    if (content) post.content = content;
    if (featuredImage) post.featuredImage = featuredImage;
    if (tags) post.tags = tags;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found." });
    if (post.authorId.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized." });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

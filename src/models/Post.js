import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    published: {
      type: Date,
      default: Date.now,
      index : true,
    },
  },
  { timestamps: true }
);
postSchema.index({authorId: 1, published: -1});
export default mongoose.model("Post", postSchema);

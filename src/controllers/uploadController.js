import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";

export const uploadMedia = async (req, res) => {
  console.log("REQ.USER:", req.user);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const primaryUrl = req.file.path;
    const lqiUrl = cloudinary.url(req.file.filename, {
      transformation: [
        { height: 50, width: 50, crop: "fill", quality: 10, format: "webp" },
      ],
    });
    const media = await Media.create({
      primaryUrl,
      lqiUrl,
      width: req.file.width,
      height: req.file.height,
      altText: req.file.originalname,
      userId: req.user.userId,
    });
    return res
      .status(201)
      .json({ message: "File uploaded successfully", media });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Server error during file upload" });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch media" });
  }
};

export const deleteMedia = async (req, res) => {
  console.log("Delete Media Req.User:", req.user);
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    if (media.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Extract public_id from URL
    const publicId = media.primaryUrl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId);
    await media.deleteOne();

    res.json({ message: "Media deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete media" });
  }
};

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images",
    format: "webp",
    transformation: [
      {
        width: 1200,
        crop: "limit",
        quality: "auto:eco"
      }
    ]
  },
  allowedFormats: ["jpg", "png", "jpeg", "gif"],
});

export const upload = multer({ storage: storage });
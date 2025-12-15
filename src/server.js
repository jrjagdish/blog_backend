import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { authLimiter,publicLimiter } from "./middlewares/security.js";

dotenv.config();
connectDB();

const app = express();
const port = 3000;
const allowedOrigins = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(express.json());
app.use("/api/v1/auth", authLimiter); 
app.use("/api/v1", publicLimiter);

app.use(cors(allowedOrigins));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/posts", likeRoutes);
app.use("/api/v1/posts", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

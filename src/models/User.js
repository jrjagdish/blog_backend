import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  username: String,
  role: { type: String, default: "blogger" }
});
export const User = mongoose.model("User", UserSchema);
import mongoose  from "mongoose";

const mediaSchema = new mongoose.Schema({
  primaryUrl: {
    type: String, required: true
  },
  lqiUrl:{type: String, required: true},
  width:Number,
  height:Number,
  altText:String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

export default mongoose.model('Media', mediaSchema);
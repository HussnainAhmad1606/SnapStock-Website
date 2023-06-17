import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageSchema = new Schema({
  title: { type: String },
  slug: { type: String },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  authorName: { type: String },
  authorBio: { type: String },
  authorAvatar: { type: String },
  isAdultOrExplicit: { type: String }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Image", imageSchema);
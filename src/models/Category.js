import mongoose from 'mongoose';
const { Schema } = mongoose;

const catSchema = new Schema({
  title: { type: String },
  image: { type: String },
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Category", catSchema);
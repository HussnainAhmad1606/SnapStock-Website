import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String },
  bio: { type: String },
  email: { type: String },
  password: { type: String },
  isBlocked: { type: Boolean },
  isAdmin: { type: Boolean }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", userSchema);
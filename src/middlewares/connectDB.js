import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_DB_URL);
  }
  return handler(req, res);
}

export default connectDB;
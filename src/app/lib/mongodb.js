import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      const dbURI = process.env.MONGODB_DIRECTORY_URL || process.env.MONGODB_URI;
      await mongoose.connect(dbURI);
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
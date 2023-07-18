import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      //   console.log("already connected");
      return;
    }

    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
  } catch (e) {
    console.error(e);
  }
};

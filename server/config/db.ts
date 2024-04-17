import mongoose from "mongoose";
import env from "../utils/validateEnv";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB Connected! ${conn.connection.host}`);
  } catch (error) {
    console.log("Database Error has occured.");
    process.exit(1);
  }
};

export default connectDB;

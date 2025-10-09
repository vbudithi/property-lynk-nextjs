import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // ✅ TEMP LOG: Check if env variable is loaded
  console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

  //If the database is already connected, dont connect again
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB is already connected...");
    return;
  }
  //connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    dbName: "propertylynk", (connected = true);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;

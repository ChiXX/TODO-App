import mongoose from "mongoose";
const mongoURI =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27018/testdb"
    : "mongodb://localhost:27017/devdb";

const connectMongoDB = async () => { 
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to ", mongoURI);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

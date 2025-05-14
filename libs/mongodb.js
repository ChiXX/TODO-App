import mongoose from "mongoose";

const connectMongoDB = async () => {
  const mongoURI = 'mongodb://localhost:27017/todo-app'
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to ", mongoURI);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

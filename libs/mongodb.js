import mongoose from "mongoose";

let isConnected = false;

const mongoURI =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27018/testdb"
    : "mongodb://localhost:27017/devdb";

const connectMongoDB = async () => {
  if (isConnected) {
    return;
  }

  if (mongoose.connections[0].readyState) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.info("✅ Connected to", mongoURI);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectMongoDB;

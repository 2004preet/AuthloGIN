const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod = null;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", process.env.MONGO_URI);
  } catch (err) {
    console.warn("Local MongoDB unavailable, falling back to in-memory server...");
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log("MongoDB in-memory server running at:", uri);
  }
};

module.exports = connectDB;

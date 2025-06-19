import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateImageRoute from "./routes/GenerateImage.js";
import posts from "./routes/Posts.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/generateImage", generateImageRoute);
app.use("/api/post", posts);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Bhuwan!" });
});

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(8080, () => console.log("Server started on port 8080"));
};

startServer();

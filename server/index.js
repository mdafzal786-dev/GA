// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";
import path from "path";
import fs from "fs";

import chatbotRoutes from "./routes/chatbot.js";

// Check .env file
console.log(fs.existsSync(".env") ? "✅ .env found" : "❌ .env missing");

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Debug env
console.log("ENV:", {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "✅ Loaded" : "❌ Missing",
});

// Razorpay
export const instance = new Razorpay({
  key_id: process.env.Razorpay_key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Port
const port = process.env.PORT || 5000;

// Default route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Static uploads
app.use("/upload", express.static("upload"));

// Other routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import ProductRoutes from "./routes/products.js";

// Use routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/api", ProductRoutes);

// 🔥 CHATBOT ROUTE
app.use("/api/chat", chatbotRoutes);

// Start server after DB connect
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

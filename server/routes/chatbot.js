// routes/chatbot.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Read prompt.txt
const readPromptFile = () => {
  const promptPath = path.join(process.cwd(), "prompt", "prompt.txt");
  return fs.readFileSync(promptPath, "utf-8");
};

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message is required" });
  }

  try {
    // 1️⃣ Read system prompt
    const systemPrompt = readPromptFile();

    // 2️⃣ Combine prompt + user message
    const finalPrompt = `
${systemPrompt}

User: ${message}
GuruAI:
`;

    // 3️⃣ Select model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    // 4️⃣ Generate response
    const result = await model.generateContent(finalPrompt);
    const reply = result.response.text?.() || "No reply from Gemini";

    res.json({ reply });

  } catch (err) {
    console.error("Gemini error:", err);

    let errorMessage = "AI service failed.";

    if (err?.message?.includes("API_KEY")) {
      errorMessage = "Invalid or missing GEMINI_API_KEY";
    } else if (err?.status === 429) {
      errorMessage = "Rate limit exceeded — try again later";
    }

    res.status(500).json({ reply: errorMessage });
  }
});

export default router;

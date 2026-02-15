import { readPromptFile } from "../utils/readPrompt.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // 1️⃣ Read prompt.txt
    const systemPrompt = readPromptFile();

    // 2️⃣ Combine prompt + user message
    const finalPrompt = `
${systemPrompt}

User: ${message}
GuruAI:
`;

    // 3️⃣ Call AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(finalPrompt);

    res.json({
      reply: result.response.text()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
};

import fs from "fs";
import path from "path";

export const readPromptFile = () => {
  const promptPath = path.join(process.cwd(), "prompt", "prompt.txt");
  return fs.readFileSync(promptPath, "utf-8");
};

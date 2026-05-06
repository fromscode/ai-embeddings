import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

async function getVector(text: string | string[]) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings!;
}

export default getVector;

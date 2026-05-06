import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({ apiKey, apiVersion: "v1alpha" });

export async function promptAI(modelQuery: string, userQuery: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "model",
        parts: [
          {
            text: modelQuery,
          },
        ],
      },
      {
        parts: [
          {
            text: userQuery,
          },
        ],
      },
    ],
  });

  console.log(response.text);
}

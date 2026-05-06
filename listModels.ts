import { GoogleGenAI } from "@google/genai";
import { writeFile } from "fs/promises";
const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({ apiKey, apiVersion: "v1" });

async function main() {
  const response = await ai.models.list();

  const dataToWrite = response.page.map((model) => model.name).join("\n");
  console.log(dataToWrite);

  await writeFile("./models.txt", dataToWrite);
  console.log("Data written successfully");
}

main();

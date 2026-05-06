import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({apiKey, apiVersion: "v1alpha"});

async function main() {
    const response = await ai.models.generateContentStream({
        model: "gemini-3.1-flash-lite-preview",
        contents: "Why is the sky blue?"
    })

    for await (const chunk of response) {
        console.log(chunk.text + "\n");
    }
}

main();
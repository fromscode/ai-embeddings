import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({apiKey});

async function main() {
    const textToEmbed = "A diet comprising of eggs, soya chunks, chickpeas, vegetables, fruits and rice is quite healthy";

    const response = await ai.models.embedContent({
        contents: textToEmbed,
        model: "gemini-embedding-001",
    })

    const vector = response.embeddings![0]!.values;

    console.log(vector);
    console.log("Length of embeddings vector: " + vector!.length)
}

main();
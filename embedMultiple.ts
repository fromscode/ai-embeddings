import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({apiKey});

async function main() {
    const text1 = "A diet comprising of eggs, soya chunks, chickpeas, vegetables, fruits and rice is quite healthy";
    const text2 = "The overall nutrition intake of a day can be divided into calories, proteins, carbs, fats and micro nutrients like fiber, vitamins, minerals etc";

    const response = await ai.models.embedContent({
        contents: [text1, text2],
        model: "gemini-embedding-001",
    })

    const vector1 = response.embeddings![0]!.values;
    const vector2 = response.embeddings![1]!.values;

    console.log(vector1!.slice(0, 5));
    console.log(vector2!.slice(0, 5));
    console.log("Length of embeddings vector1: " + vector1!.length)
    console.log("Length of embeddings vector2: " + vector2!.length)
}

main();
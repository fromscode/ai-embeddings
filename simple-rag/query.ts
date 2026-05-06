import { Pinecone } from "@pinecone-database/pinecone";
import getVector from "./getVector.js";
import { promptAI } from "./promptAI.js";

const apiKey = process.env.PINECONE_API_KEY!;
const indexName = process.env.PINECONE_INDEX_NAME!;
const indexHost = process.env.PINECONE_INDEX_HOST!;

const pc = new Pinecone({ apiKey });

const index = pc.index({
  name: indexName,
  host: indexHost,
});

async function main() {
  const query = process.argv.slice(2).join(" ");

  if (!query) return;

  const vector = (await getVector(query)!)![0]!.values!;

  const context = await index.query({
    vector,
    topK: 7,
    includeMetadata: true,
  });

  const contextText = context.matches
    .map((response) => response.metadata!.chunk_text)
    .join("\n");

  const modelQuery = `
    Your are a professional chatbot with a supreme sense of duty and professionalism.

    Whatever is asked of you, you only refer to the below provided context and respond according to this context and this context only.
    If you cannot find a suitable answer from the below provided context then you simply say "I do not know."

    Context:
    ${contextText}
  `;

  await promptAI(modelQuery, query);
}

main();

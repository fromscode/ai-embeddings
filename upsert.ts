import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY!;
const indexName = process.env.PINECONE_INDEX_NAME!;
const indexHost = process.env.PINECONE_INDEX_HOST!;

const pc = new Pinecone({ apiKey });

// To get the unique host for an index,
// see https://docs.pinecone.io/guides/manage-data/target-an-index
const index = pc.index({
  name: indexName,
  host: indexHost,
});

export async function upsert(
  records: {
    id: string;
    values: number[];
    metadata: { category: string; chunk_text: string };
  }[],
) {
  await index.upsert({ records });
}

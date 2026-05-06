import getVector from "./getVector.js";

import datasource from "../datasource.js";
import { upsert } from "../upsert.js";

const sentences = datasource.map(
  (obj) => `Category: ${obj.category}.
${obj.chunk_text}`,
);

async function main() {
  console.log("------ Ingestion Initiated ---------");

  const responses = await getVector(sentences);

  console.log("---------- Vectors created -------------");

  const vectors = responses.map((response) => response!.values!);

  const records = datasource.map((obj, i) => {
    // console.log(i);
    return {
      id: obj._id,
      values: vectors[i]!,
      metadata: {
        category: obj.category,
        chunk_text: obj.chunk_text,
      },
    };
  });

  console.log("-------- Beginning insertion to vector database -------------");

  await upsert(records);

  console.log("----------- Data ingestion successfull -----------------");

  // Further TO-DO: take a query from the user and then find the top k most popular vectors
}

main();

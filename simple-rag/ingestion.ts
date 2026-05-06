import getVector from "./getVector.js";

import datasource from "../datasource.js";

const sentences = datasource.map((obj) => `Category: ${obj.category}.
${obj.chunk_text}`);

async function main() {
    const responses = await getVector(sentences);

    const vectors = responses.map(response => response!.values!);

    for (let i=0; i<sentences.length; ++i) {
        console.log(`Sentence: ${sentences[i]}, Vector: [${vectors[i]!.slice(0, 3).join(', ')}]`);
    }

    // TO-DO: update these vectors to a vector db

    // Further TO-DO: take a query from the user and then find the top k most popular vectors
}

main();
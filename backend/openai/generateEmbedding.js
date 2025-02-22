import openAiClient from "./config.js";

const generateEmbedding = async (text) => {
  const embedding = await openAiClient.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  return embedding.data[0].embedding;
};

export default generateEmbedding;

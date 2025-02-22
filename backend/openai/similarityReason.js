import openAiClient from "./config.js";

const similarityReason = async (jobA, jobB, score) => {
  const completion = await openAiClient.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      { role: "system", content: process.env.SIMILARITY_PROMPT },
      {
        role: "user",
        content: `Here is jobA: '''${jobA}'''\n\nHere is jobB: '''${jobB}'''\n\nHere is the score: ${score}`,
      },
    ],
    temperature: 0.3,
  });

  const chat = completion?.choices?.[0]?.message?.content;

  if (!chat)
    throw new Error(
      "Failed to retrieve a valid response from the OpenAI API. Please try again later."
    );

  return chat;
};

export default similarityReason;

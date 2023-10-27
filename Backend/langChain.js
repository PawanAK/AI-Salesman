// import { OpenAI } from "langchain/llms/openai";

// const apiKey = process.env.API_KEY;
// const llm = new OpenAI({
//     openAIApiKey: apiKey,
// });

// import { HumanMessage } from "langchain/schema";

// const text =
//   "What would be a good company name for a company that makes colorful socks?";

// const messages = [new HumanMessage({ content: text })];

// const llmResult = await llm.predictMessages(messages);

// console.log(llmResult);

import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({
  modelName: "text-davinci-003", // Defaults to "text-davinci-003" if no model provided.
  temperature: 0.9,
  openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
});
const res = await model.call(
  "What would be a good company name a company that makes colorful socks?"
);
console.log({ res });
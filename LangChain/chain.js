const { ChatGoogleGenerativeAI } = require('@langchain/google-genai')
const { PromptTemplate } = require('@langchain/core/prompts')
const { StringOutputParser } = require('@langchain/core/output_parsers')

const model = new ChatGoogleGenerativeAI({
  model: 'models/gemini-3.8-flash', 
  maxOutputTokens: 2000,
  temperature: 0.5,
  apiKey: process.env.GOOGLE_API_KEY
})

// // Prompt (Fixed typo in 'beginner')
// const prompt = PromptTemplate.fromTemplate(
//   "Explain the topic : {topic} to a beginner."
// )

const outputParser = new StringOutputParser()

// Chaining
// const chain = prompt.pipe(model).pipe(outputParser)

// async function responseio() {
//   try {
//     const response = await chain.invoke({ topic: "JavaScript" })
//     return response
//   } catch (error) {
//     console.error("Error invoking chain:", error)
//   }
// }

// async function main() {
//   const result = await responseio()
//   console.log("Response - \n", result)
// }

// main()

// Create prompt
const prompt = PromptTemplate.fromTemplate(
  //"Explain the concept of {topic} to a beginner."
  "You are a helpful Assitant, Answer the question {question}"
);

// Build chain
//const chain = RunnableSequence.from([prompt, model]);

const chain=prompt.pipe(model)

//OUTPUT PARSER

// Run
//const result = await chain.invoke({ topic: "quantum computing" });

const result=await chain.invoke({
  question:"What is the Future of AI in healthCare"
})
console.log("Gemini Response:\n", result);


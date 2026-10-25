const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { createAgent, tool } = require('langchain');
const { z } = require('zod');

// 1. Initialize the Gemini Model instance
const model = new ChatGoogleGenerativeAI({
    model: 'models/gemini-3.8-flash', // Using a standard stable model string
    maxOutputTokens: 2000,
    temperature: 0.5,
    apiKey: process.env.GOOGLE_API_KEY
});

// 2. Define the tool with an explicit parameter schema
const weatherTool = tool(
    async ({ location }) => {
        try {
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);

            console.log("--Step - 01");
            
            if (!geoResponse.ok) {
                return `Error: Failed to connect to the geocoding service for ${location}.`;
            }

            const data = await geoResponse.json();

            if (!data.results || data.results.length === 0) {
                return `Error: Please send a valid City name. No matching coordinates found for ${location}.`;
            }

            const lat = data.results[0].latitude;
            const long = data.results[0].longitude;

            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`);

            if (!weatherResponse.ok) {
                return `Error: Failed to pull metrics from weather forecasting servers for ${location}.`;
            }

            console.log("Step - 02");
            

            const tempData = await weatherResponse.json();
            return `The current temperature in ${location} is ${tempData.current.temperature_2m}°C.`;
        } catch (err) {
            return `Error executing tool: ${err.message}`;
        }
    },
    {
        name: "get_weather",
        description: "Get the current weather for a given location",
        schema: z.object({
            location: z.string().describe('The city or location, to check the current weather')
        })
    }
);

// 3. Instantiate the agent using 'llm' instead of 'model'
const agent = createAgent({
    model: model, // Fix: Use 'llm' property key
    tools: [weatherTool]
});

async function responseio() {
    console.log("- something ");
    
    // Fix: Invoke the agent with a 'messages' array payload matching the schema
    const res = await agent.invoke({
        messages: [
            {
                role: "user",
                content: "What is the current weather in Bengaluru?"
            }
        ]
    });

    console.log("--res---",res);
    

    // Fix: Access conversational responses via the last message's content property
    const finalMessage = res.messages[res.messages.length - 1];
    return finalMessage.content;
}

async function main() {
    const result = await responseio();
    console.log("Response - \n", result);
}

main().catch(console.error);

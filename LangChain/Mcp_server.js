// Mcp_server.js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

// 1. Create the MCP Server instance
const server = new McpServer({
    name: "Currency Converter",
    version: "1.0.0"
})

// 2. Register your tool
server.tool(
    "currency_converter",
    "Convert amount from one currency to another currency",
    {
        amount: z.number().describe("Amount to be converted e.g., 100"),
        from: z.string().describe("Source currency e.g., USD"),
        to: z.string().describe("Destination currency e.g., INR"),
    },
    async ({ amount, from, to }) => {
        try {


            const res = await fetch(`https://open.er-api.com/v6/latest/${from.toUpperCase()}`)
            const data = await res.json()
            const toBeConverted = data.rates[to.toUpperCase()] * amount

            return {
                content: [{
                    type: "text",
                    text: `${amount} ${from} converted into ${toBeConverted} ${to}`
                }]
            }
        } catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Error in the tool: ${error.message}` }]
            }
        }
    }
)

//ANOther tool
server.tool(
    "Multipvatom",
    "Multiplication two numbers",
    {
        n1: z.number().describe("NUmber one e.g., 10"),
        n2: z.number().describe("NUmber two e.g., 20"),
    },
    async ({ n1, n2 }) => {
        try {

            const mul = n1 * n2

            return {
                content: [{
                    type: "text",
                    text: `${n1} * ${n2} result of Multiplication ${mul}`
                }]
            }
        } catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Error in the tool: ${error.message}` }]
            }
        }
    }
)

// 3. Connect with Client via Stdio
async function startServer() {
    try {
        const transport = new StdioServerTransport()
        await server.connect(transport)
        console.error("MCP server successfully connected via Stdio.");
    } catch (error) {
        console.error("Error while connecting to the MCP Server:", error);
        process.exit(1)
    }
}

startServer()

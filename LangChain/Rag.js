import express from 'express';
import multer from 'multer';
import { PDFExtract } from 'pdf.js-extract';
import fs from 'node:fs';
import { GoogleGenAI } from '@google/genai';


const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    }
});

const uploads = multer({ storage: storage });

// Middleware for parsing text-based form inputs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY// Note: Keep this key secure!
});


function cosaineSimilarity(queVect, chuVect) {
    let dotProduct = 0
    for (let i = 0; i < queVect.length; i++) {
        dotProduct = dotProduct + (queVect[i] * chuVect[i])
    }
    return dotProduct
}



// PLACE THE RETRY FUNCTION DIRECTLY HERE:
async function callGeminiWithRetry(apiCallFn, retries = 5, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await apiCallFn();
        } catch (error) {
            const is503 = error.status === 503 ||
                (error.message && (error.message.includes('503') || error.message.includes('UNAVAILABLE')));

            if (is503 && i < retries - 1) {
                console.warn(`[Gemini API Overloaded (503)] Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2;
                continue;
            }
            throw error;
        }
    }
}



app.get('/', async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is healthy and running."
    });
});

app.post('/upload', uploads.single('pdf'), async (req, res) => {

    const { question } = req.body
    if (!req.file) {
        return res.status(400).json({ success: false, message: "File upload failed. Please ensure your form field name is 'pdf' and a file is attached." });
    }

    const chunkEmbeddings = [];
    const questionEmbeddings = []
    const filePath = req.file.path;

    //CREATING EMBEDDINGS
    async function createEmbeddings(sentenceText, question) {
        try {
            const response = await ai.models.embedContent({
                model: "gemini-embedding-001",
                contents: sentenceText,
            });

            let vector = null;
            if (response.embeddings) {
                if (Array.isArray(response.embeddings) && response.embeddings[0]) {
                    vector = response.embeddings[0].values; // standard array wrapper
                } else if (response.embeddings.values) {
                    vector = response.embeddings.values; // object wrapper
                }
            } else if (response.embedding && response.embedding.values) {
                vector = response.embedding.values;
            }

            if (vector) {
                if (question) {
                    questionEmbeddings.push({
                        text: sentenceText,
                        embeddings: vector
                    });
                    console.log("--> Successfully embedded the question.");
                } else {
                    chunkEmbeddings.push({
                        text: sentenceText,
                        embeddings: vector
                    });
                }
            } else {
                console.error("Could not find vector array in response structure:", JSON.stringify(response));
            }
        } catch (err) {
            console.error("Embedding generation failed for text:", sentenceText, err);
        }
    }

    try {

        //PDF EXTRACTION 
        const pdfExtract = new PDFExtract();
        const options = {};

        // 3. Promisify the callback correctly
        const data = await new Promise((resolve, reject) => {
            pdfExtract.extract('RAHUL SHAIK.pdf', options, (err, extractedData) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(extractedData);
                }
            });
        });

        let pageCount = 1;
        for (const page of data.pages) {
            console.log(`--- PAGE ${pageCount} ---`);
            pageCount++;

            if (!page.content || page.content.length === 0) continue;

            const pageText = page.content.map(item => item.str).join(' ');
            const sentences = pageText.split(/(?<=[.!?])\s+/);

            for (const sentence of sentences) {
                const cleanSentence = sentence.trim();

                if (cleanSentence.length > 0) {
                    // Await the embedding generation safely 
                    await createEmbeddings(cleanSentence);
                    // Write each sentence to your tracking text file
                    fs.appendFileSync('output.txt', cleanSentence + '\n');
                }
            }
        }


        //Question EMbedding-
        await createEmbeddings(question, 1)

        let bestChunk = null
        let bestScore = -Infinity

        for (const item of chunkEmbeddings) {

            const score = cosaineSimilarity(questionEmbeddings[0].embeddings, item.embeddings)

            if (Number(score.toFixed(2)) > bestScore) {
                console.log("--score to be be fixed--", score.toFixed(2));
                console.log("--ITEM-----", item.text);

                bestChunk = item.text
                bestScore = score.toFixed(2)
            }

        }

        const explanation = await callGeminiWithRetry(() =>
            ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: `Answer the question using the context provided below.\n\nContext: ${bestChunk}\n\nQuestion: ${question}`
            })
        );

        console.log("RAG Explanation:", explanation.text);


        if (explanation.text) {

            return res.status(200).json({
                success: true,
                message: "File uploaded, parsed, and embedded successfully.",
                data: explanation.text
            });
        }


    } catch (error) {
        console.error(`PDF Info Error:`, error);
        // Emergency Cleanup: Ensure temporary file drops out if parsing crashes mid-way
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath).catch(() => { });
        }
        return res.status(500).json({ success: false, message: "File parsing failed", error: error.message });
    }
});


app.listen(3000, () => {
    console.log("Server started at PORT 3000");
});

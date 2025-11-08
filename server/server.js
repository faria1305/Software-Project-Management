
import { GoogleGenAI } from '@google/genai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = 3001;


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("FATAL: GEMINI_API_KEY environment variable not set.");
    process.exit(1);
}


const ai = new GoogleGenAI({ apiKey });

const sessions = {}; 
const MODEL = "gemini-2.5-flash"; // Fast and capable model for chat


app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());



/**
 * Initializes a new chat session with the given session ID.
 * @param {string} sessionId The unique ID for the user's session.
 */
function createNewChatSession(sessionId) {
    
console.log(`Creating new session: ${sessionId}`);
    const chat = ai.chats.create({
        model: MODEL,
        config: {
            systemInstruction: "You are a friendly and helpful assistant. Keep responses concise and conversational."
        }
    });
    
    sessions[sessionId] = chat;
    return chat;
}

app.post('/chat', async (req, res) => {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
        return res.status(400).json({ error: 'Missing sessionId or message.' });
    }

    try {
      
        let chat = sessions[sessionId];
        if (!chat) {
            chat = createNewChatSession(sessionId);
        }

        const result = await chat.sendMessage({ message: message });
        
        const history = await chat.getHistory();

        const historyForClient = history.map(turn => ({
            role: turn.role,
            text: turn.parts[0].text 
        }));

        res.json({
            response: result.text,
            fullHistory: historyForClient
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ 
            error: 'Failed to communicate with the AI.',
            details: error.message 
        });
    }
});


app.post('/reset', (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Missing sessionId.' });
    }

    if (sessions[sessionId]) {
        delete sessions[sessionId];
        console.log(`Session reset for: ${sessionId}`);
        return res.json({ success: true, message: 'Chat history deleted.' });
    } else {
        
        return res.json({ success: true, message: 'No active session to delete.' });
    }
});


app.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
    console.log(`Model being used: ${MODEL}`);
});
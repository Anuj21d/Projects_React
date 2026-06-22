import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/index.js';

class LLMService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: config.gemini.model });
    }

    async generateResponse(prompt, conversationHistory = []) {
        try {
            // Build chat context
            const chat = this.model.startChat({
                history: conversationHistory.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Failed to generate response:', error);
            throw error;
        }
    }

    async generateStreamingResponse(prompt, conversationHistory = []) {
        try {
            const chat = this.model.startChat({
                history: conversationHistory.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessageStream(prompt);
            return result.stream;
        } catch (error) {
            console.error('Failed to generate streaming response:', error);
            throw error;
        }
    }

    buildRAGPrompt(query, retrievedDocs) {
        const context = retrievedDocs
            .map((doc, idx) => {
                return `[${idx + 1}] ${doc.payload.title}\n${doc.payload.content}\nSource: ${doc.payload.url}\n`;
            })
            .join('\n---\n');

        const prompt = `You are a helpful news assistant. Answer the user's question based on the following news articles. 
If the information is not in the articles, say so. Always cite your sources by referring to the article numbers [1], [2], etc.

Context from news articles:
${context}

User question: ${query}

Please provide a comprehensive answer based on the articles above. Include source citations.`;

        return prompt;
    }

    extractSources(retrievedDocs) {
        return retrievedDocs.map(doc => ({
            title: doc.payload.title,
            url: doc.payload.url,
            snippet: doc.payload.content.substring(0, 200) + '...',
            score: doc.score,
        }));
    }
}

export const llmService = new LLMService();

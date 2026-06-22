import { embeddingsService } from './embeddings.js';
import { qdrantService } from './vectorStore.js';
import { llmService } from './llm.js';
import { redisClient } from '../config/redis.js';
import { config } from '../config/index.js';

class RAGService {
    async query(userQuery, sessionId) {
        try {
            console.log(`🔍 Processing query: "${userQuery}"`);

            // Check query cache
            const queryHash = redisClient.hashText(userQuery);
            const cachedResponse = await redisClient.getCachedQuery(queryHash);

            if (cachedResponse) {
                console.log('📦 Using cached query response');
                return cachedResponse;
            }

            // Step 1: Generate embedding for the query
            const queryEmbedding = await embeddingsService.generateEmbedding(userQuery);

            // Step 2: Search vector store for relevant documents
            const retrievedDocs = await qdrantService.search(
                queryEmbedding,
                config.rag.topK
            );

            console.log(`📚 Retrieved ${retrievedDocs.length} relevant documents`);

            // Step 3: Get conversation history
            const conversationHistory = await redisClient.getHistory(sessionId);

            // Step 4: Build RAG prompt
            const prompt = llmService.buildRAGPrompt(userQuery, retrievedDocs);

            // Step 5: Generate response using LLM
            const response = await llmService.generateResponse(prompt, conversationHistory);

            // Step 6: Extract sources
            const sources = llmService.extractSources(retrievedDocs);

            const result = {
                response,
                sources,
            };

            // Cache the response
            await redisClient.cacheQuery(queryHash, result);

            return result;
        } catch (error) {
            console.error('RAG query failed:', error);
            throw error;
        }
    }

    async queryStream(userQuery, sessionId, onChunk) {
        try {
            console.log(`🔍 Processing streaming query: "${userQuery}"`);

            // Step 1: Generate embedding for the query
            const queryEmbedding = await embeddingsService.generateEmbedding(userQuery);

            // Step 2: Search vector store for relevant documents
            const retrievedDocs = await qdrantService.search(
                queryEmbedding,
                config.rag.topK
            );

            console.log(`📚 Retrieved ${retrievedDocs.length} relevant documents`);

            // Step 3: Get conversation history
            const conversationHistory = await redisClient.getHistory(sessionId);

            // Step 4: Build RAG prompt
            const prompt = llmService.buildRAGPrompt(userQuery, retrievedDocs);

            // Step 5: Generate streaming response
            const stream = await llmService.generateStreamingResponse(prompt, conversationHistory);

            // Step 6: Extract sources
            const sources = llmService.extractSources(retrievedDocs);

            let fullResponse = '';

            // Stream the response
            for await (const chunk of stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                onChunk(chunkText);
            }

            return {
                response: fullResponse,
                sources,
            };
        } catch (error) {
            console.error('RAG streaming query failed:', error);
            throw error;
        }
    }

    async saveConversation(sessionId, userMessage, assistantMessage) {
        try {
            // Save user message
            await redisClient.saveMessage(sessionId, {
                role: 'user',
                content: userMessage,
                timestamp: new Date().toISOString(),
            });

            // Save assistant message
            await redisClient.saveMessage(sessionId, {
                role: 'assistant',
                content: assistantMessage,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Failed to save conversation:', error);
            throw error;
        }
    }
}

export const ragService = new RAGService();

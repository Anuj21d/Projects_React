import { ragService } from '../services/rag.js';
import { redisClient } from '../config/redis.js';
import { v4 as uuidv4 } from 'uuid';

export const chatController = {
    // POST /api/chat/message
    async sendMessage(req, res) {
        try {
            const { sessionId, message } = req.body;

            if (!message || !message.trim()) {
                return res.status(400).json({ error: 'Message is required' });
            }

            // Use provided sessionId or generate new one
            const activeSessionId = sessionId || uuidv4();

            // Process query through RAG pipeline
            const result = await ragService.query(message, activeSessionId);

            // Save conversation to Redis
            await ragService.saveConversation(
                activeSessionId,
                message,
                result.response
            );

            res.json({
                sessionId: activeSessionId,
                response: result.response,
                sources: result.sources,
            });
        } catch (error) {
            console.error('Error in sendMessage:', error);
            res.status(500).json({
                error: 'Failed to process message',
                details: error.message
            });
        }
    },

    // GET /api/chat/history/:sessionId
    async getHistory(req, res) {
        try {
            const { sessionId } = req.params;

            if (!sessionId) {
                return res.status(400).json({ error: 'Session ID is required' });
            }

            const exists = await redisClient.sessionExists(sessionId);
            if (!exists) {
                return res.json({
                    sessionId,
                    messages: [],
                });
            }

            const messages = await redisClient.getHistory(sessionId);

            res.json({
                sessionId,
                messages,
            });
        } catch (error) {
            console.error('Error in getHistory:', error);
            res.status(500).json({
                error: 'Failed to fetch history',
                details: error.message
            });
        }
    },

    // DELETE /api/chat/session/:sessionId
    async clearSession(req, res) {
        try {
            const { sessionId } = req.params;

            if (!sessionId) {
                return res.status(400).json({ error: 'Session ID is required' });
            }

            await redisClient.clearSession(sessionId);

            res.json({
                success: true,
                message: 'Session cleared successfully',
            });
        } catch (error) {
            console.error('Error in clearSession:', error);
            res.status(500).json({
                error: 'Failed to clear session',
                details: error.message
            });
        }
    },

    // POST /api/chat/new-session
    async createSession(req, res) {
        try {
            const sessionId = uuidv4();

            res.json({
                sessionId,
                message: 'New session created',
            });
        } catch (error) {
            console.error('Error in createSession:', error);
            res.status(500).json({
                error: 'Failed to create session',
                details: error.message
            });
        }
    },
};

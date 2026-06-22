import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import { redisClient } from './config/redis.js';
import { qdrantService } from './services/vectorStore.js';
import { ragService } from './services/rag.js';
import chatRoutes from './routes/chat.js';

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// WebSocket handling
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'message') {
                const { sessionId, content } = data;

                // Use RAG service with streaming
                await ragService.queryStream(content, sessionId, (chunk) => {
                    ws.send(JSON.stringify({
                        type: 'token',
                        content: chunk
                    }));
                }).then((result) => {
                    // Send final payload with sources
                    ws.send(JSON.stringify({
                        type: 'done',
                        sources: result.sources
                    }));

                    // Save conversation
                    ragService.saveConversation(sessionId, content, result.response);
                });
            }
        } catch (error) {
            console.error('WebSocket error:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Internal server error'
            }));
        }
    });
});

// Start server
async function startServer() {
    try {
        // Initialize services
        await redisClient.connect();
        await qdrantService.initialize();

        httpServer.listen(config.port, () => {
            console.log(`
🚀 Server running on port ${config.port}
👉 API: http://localhost:${config.port}
👉 Environment: ${config.nodeEnv}
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    httpServer.close(async () => {
        await redisClient.disconnect();
        console.log('HTTP server closed');
    });
});

startServer();

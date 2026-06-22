import { createClient } from 'redis';
import { config } from '../config/index.js';

class RedisClient {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            const isTls = config.redis.url.startsWith('rediss://');
            this.client = createClient({
                url: config.redis.url,
                socket: {
                    tls: isTls,
                    rejectUnauthorized: false // Often needed for serverless redis
                }
            });

            this.client.on('error', (err) => {
                console.error('Redis Client Error:', err);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                console.log('✅ Redis connected successfully');
                this.isConnected = true;
            });

            await this.client.connect();
            return this.client;
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    async disconnect() {
        if (this.client) {
            await this.client.quit();
            this.isConnected = false;
        }
    }

    // Session management
    async saveMessage(sessionId, message) {
        const key = `session:${sessionId}`;
        await this.client.rPush(key, JSON.stringify(message));
        await this.client.expire(key, config.cache.sessionTTL);
    }

    async getHistory(sessionId) {
        const key = `session:${sessionId}`;
        const messages = await this.client.lRange(key, 0, -1);
        return messages.map(msg => JSON.parse(msg));
    }

    async clearSession(sessionId) {
        const key = `session:${sessionId}`;
        await this.client.del(key);
    }

    async sessionExists(sessionId) {
        const key = `session:${sessionId}`;
        return await this.client.exists(key);
    }

    // Query caching
    async getCachedQuery(queryHash) {
        const key = `query:${queryHash}`;
        const cached = await this.client.get(key);
        return cached ? JSON.parse(cached) : null;
    }

    async cacheQuery(queryHash, response) {
        const key = `query:${queryHash}`;
        await this.client.setEx(
            key,
            config.cache.queryCacheTTL,
            JSON.stringify(response)
        );
    }

    // Embedding caching
    async getCachedEmbedding(text) {
        const key = `embedding:${this.hashText(text)}`;
        const cached = await this.client.get(key);
        return cached ? JSON.parse(cached) : null;
    }

    async cacheEmbedding(text, embedding) {
        const key = `embedding:${this.hashText(text)}`;
        await this.client.setEx(
            key,
            config.cache.embeddingCacheTTL,
            JSON.stringify(embedding)
        );
    }

    // Utility
    hashText(text) {
        // Simple hash function for caching
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
}

export const redisClient = new RedisClient();

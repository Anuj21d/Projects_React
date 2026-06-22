import axios from 'axios';
import { config } from '../config/index.js';
import { redisClient } from '../config/redis.js';

class EmbeddingsService {
    constructor() {
        this.apiUrl = config.jina.apiUrl;
        this.apiKey = config.jina.apiKey;
        this.model = config.jina.model;
    }

    async generateEmbedding(text) {
        try {
            // Check cache first
            const cached = await redisClient.getCachedEmbedding(text);
            if (cached) {
                console.log('📦 Using cached embedding');
                return cached;
            }

            // Generate new embedding
            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    input: [text],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`,
                    },
                }
            );

            const embedding = response.data.data[0].embedding;

            // Cache the embedding
            await redisClient.cacheEmbedding(text, embedding);

            return embedding;
        } catch (error) {
            console.error('Failed to generate embedding:', error.response?.data || error.message);
            throw error;
        }
    }

    async generateEmbeddings(texts) {
        try {
            // For batch processing, we'll check cache for each and only generate uncached ones
            const results = [];
            const uncachedTexts = [];
            const uncachedIndices = [];

            // Check cache for each text
            for (let i = 0; i < texts.length; i++) {
                const cached = await redisClient.getCachedEmbedding(texts[i]);
                if (cached) {
                    results[i] = cached;
                } else {
                    uncachedTexts.push(texts[i]);
                    uncachedIndices.push(i);
                }
            }

            // Generate embeddings for uncached texts
            if (uncachedTexts.length > 0) {
                const response = await axios.post(
                    this.apiUrl,
                    {
                        model: this.model,
                        input: uncachedTexts,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.apiKey}`,
                        },
                    }
                );

                // Cache and store new embeddings
                for (let i = 0; i < uncachedTexts.length; i++) {
                    const embedding = response.data.data[i].embedding;
                    await redisClient.cacheEmbedding(uncachedTexts[i], embedding);
                    results[uncachedIndices[i]] = embedding;
                }
            }

            console.log(`✅ Generated ${uncachedTexts.length} new embeddings, ${texts.length - uncachedTexts.length} from cache`);
            return results;
        } catch (error) {
            console.error('Failed to generate embeddings:', error.response?.data || error.message);
            throw error;
        }
    }
}

export const embeddingsService = new EmbeddingsService();

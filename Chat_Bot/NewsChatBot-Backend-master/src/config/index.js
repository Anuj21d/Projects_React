import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-2.5-flash',
  },

  jina: {
    apiKey: process.env.JINA_API_KEY,
    model: 'jina-embeddings-v2-base-en',
    apiUrl: 'https://api.jina.ai/v1/embeddings',
  },

  qdrant: {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: 'news_articles',
    vectorSize: 768, // Jina embeddings v2 base
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.REDIS_TTL) || 3600,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  rag: {
    topK: parseInt(process.env.TOP_K_RESULTS) || 5,
    chunkSize: parseInt(process.env.CHUNK_SIZE) || 500,
    chunkOverlap: parseInt(process.env.CHUNK_OVERLAP) || 50,
  },

  cache: {
    sessionTTL: 3600,        // 1 hour
    queryCacheTTL: 900,      // 15 minutes
    embeddingCacheTTL: 86400, // 24 hours
  },
};

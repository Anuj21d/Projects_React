import { QdrantClient } from '@qdrant/js-client-rest';
import { config } from '../config/index.js';

class QdrantService {
    constructor() {
        this.client = new QdrantClient({
            url: config.qdrant.url,
            apiKey: config.qdrant.apiKey,
        });
        this.collectionName = config.qdrant.collectionName;
    }

    async initialize() {
        try {
            // Check if collection exists
            const collections = await this.client.getCollections();
            const exists = collections.collections.some(
                col => col.name === this.collectionName
            );

            if (!exists) {
                // Create collection
                await this.client.createCollection(this.collectionName, {
                    vectors: {
                        size: config.qdrant.vectorSize,
                        distance: 'Cosine',
                    },
                });
                console.log(`✅ Created Qdrant collection: ${this.collectionName}`);
            } else {
                console.log(`✅ Qdrant collection exists: ${this.collectionName}`);
            }
        } catch (error) {
            console.error('Failed to initialize Qdrant:', error);
            throw error;
        }
    }

    async upsertPoints(points) {
        try {
            await this.client.upsert(this.collectionName, {
                wait: true,
                points: points,
            });
            console.log(`✅ Upserted ${points.length} points to Qdrant`);
        } catch (error) {
            console.error('Failed to upsert points:', error);
            throw error;
        }
    }

    async search(queryVector, limit = config.rag.topK, filter = null) {
        try {
            const searchParams = {
                vector: queryVector,
                limit: limit,
            };

            if (filter) {
                searchParams.filter = filter;
            }

            const results = await this.client.search(
                this.collectionName,
                searchParams
            );

            return results;
        } catch (error) {
            console.error('Failed to search Qdrant:', error);
            throw error;
        }
    }

    async getCollectionInfo() {
        try {
            return await this.client.getCollection(this.collectionName);
        } catch (error) {
            console.error('Failed to get collection info:', error);
            throw error;
        }
    }

    async deleteCollection() {
        try {
            await this.client.deleteCollection(this.collectionName);
            console.log(`✅ Deleted collection: ${this.collectionName}`);
        } catch (error) {
            console.error('Failed to delete collection:', error);
            throw error;
        }
    }
}

export const qdrantService = new QdrantService();

import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { qdrantService } from '../src/services/vectorStore.js';
import { embeddingsService } from '../src/services/embeddings.js';
import { config } from '../src/config/index.js';
// Mock redisclient for ingestion script since we might not need caching here or need to initialize it differently
// But since we imported services that depend on it, we need to handle it. 
// We will initialize redis connection in the main function.
import { redisClient } from '../src/config/redis.js';

const parser = new Parser();

const RSS_FEEDS = [
    'https://techcrunch.com/feed/',
    'http://feeds.bbci.co.uk/news/technology/rss.xml',
    'https://www.theverge.com/rss/index.xml',
    'https://www.wired.com/feed/category/science/latest/rss',
    'https://www.wired.com/feed/category/security/latest/rss'
];

async function fetchArticleContent(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 5000
        });
        const $ = cheerio.load(response.data);

        // Remove script and style elements
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('header').remove();
        $('footer').remove();

        // Extract main text - simplified selector strategy
        const content = $('p').map((i, el) => $(el).text()).get().join(' ');
        return content.replace(/\s+/g, ' ').trim();
    } catch (error) {
        console.warn(`Failed to fetch content from ${url}: ${error.message}`);
        return null;
    }
}

function chunkText(text, size = 500, overlap = 50) {
    if (!text) return [];
    const words = text.split(' ');
    const chunks = [];

    for (let i = 0; i < words.length; i += (size - overlap)) {
        const chunk = words.slice(i, i + size).join(' ');
        if (chunk.length > 50) { // Filter out tiny chunks
            chunks.push(chunk);
        }
    }
    return chunks;
}

async function ingestNews() {
    console.log('🚀 Starting news ingestion...');

    try {
        // Initialize services
        await redisClient.connect();
        await qdrantService.initialize();

        let totalArticles = 0;
        const allPoints = [];

        for (const feedUrl of RSS_FEEDS) {
            console.log(`📡 Fetching feed: ${feedUrl}`);
            try {
                const feed = await parser.parseURL(feedUrl);

                // Limit to 10 articles per feed to reach ~50 total
                const items = feed.items.slice(0, 10);

                for (const item of items) {
                    console.log(`Processing: ${item.title}`);

                    let content = item.contentSnippet || item.content;

                    // Optionally fetch full content if snippet is too short
                    if (!content || content.length < 200) {
                        const fullContent = await fetchArticleContent(item.link);
                        if (fullContent) content = fullContent;
                    }

                    if (!content) continue;

                    // Chunk the content
                    const chunks = chunkText(content);

                    // Generate embeddings for chunks
                    const embeddings = await embeddingsService.generateEmbeddings(chunks);

                    // Prepare points for Qdrant
                    chunks.forEach((chunk, idx) => {
                        allPoints.push({
                            id: uuidv4(),
                            vector: embeddings[idx],
                            payload: {
                                title: item.title,
                                url: item.link,
                                publishedDate: item.pubDate,
                                content: chunk,
                                chunkIndex: idx,
                                feedSource: feedUrl
                            }
                        });
                    });

                    totalArticles++;
                }
            } catch (err) {
                console.error(`Error processing feed ${feedUrl}:`, err.message);
            }
        }

        if (allPoints.length > 0) {
            // Batch upsert to Qdrant (in chunks of 100 to avoid request size limits)
            const batchSize = 100;
            for (let i = 0; i < allPoints.length; i += batchSize) {
                const batch = allPoints.slice(i, i + batchSize);
                await qdrantService.upsertPoints(batch);
                console.log(`💾 Persisted ${batch.length} text chunks`);
            }
            console.log(`✨ Successfully ingested ${totalArticles} articles (${allPoints.length} chunks)`);
        } else {
            console.log('⚠️ No content to ingest');
        }

    } catch (error) {
        console.error('🔥 Fatal error during ingestion:', error);
    } finally {
        await redisClient.disconnect();
        process.exit(0);
    }
}

// Run ingestion
ingestNews();

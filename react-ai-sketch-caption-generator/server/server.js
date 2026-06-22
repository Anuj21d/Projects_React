import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 8787;

// Increase payload limit to handle large base64 images (up to 10MB)
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// Initialize Google GenAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/', async (req, res) => {
  try {
    const { image, mimeType } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, error: "No image provided." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, error: "Server Configuration Error: The GEMINI_API_KEY environment variable is missing on your hosting provider (Render)." });
    }

    // Prepare the prompt for the AI
    const prompt = `
      You are an expert art critic and social media manager.
      Analyze this image and provide a response in the exact following format. DO NOT use markdown, bold text, or asterisks.
      
      Caption: [A short, engaging caption for this artwork, exactly 1 to 2 sentences maximum]
      Style: [Identify the art style, medium, and aesthetics in 2-4 words, e.g., Digital Watercolor, Whimsical]
      Hashtags: [#tag1 #tag2 #tag3]
    `;

    // Fetch available models to avoid hardcoding and handle 503 errors gracefully
    const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const modelsData = await modelsResponse.json();
    
    let availableModels = ["gemini-2.0-flash"]; // Default fallback
    if (modelsData.models) {
      availableModels = modelsData.models
        .map(m => m.name.replace('models/', ''))
        .filter(n => n.includes('flash') && !n.includes('tts'));
      
      // Prioritize 2.0-flash to avoid 2.5-flash high demand spikes initially
      availableModels.sort((a, b) => (a === 'gemini-2.0-flash' ? -1 : b === 'gemini-2.0-flash' ? 1 : 0));
    }

    let resultText = "";
    let lastError = null;

    // Try available models one by one
    for (const modelName of availableModels) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const response = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: image,
              mimeType: mimeType || 'image/jpeg'
            }
          }
        ]);
        resultText = response.response.text();
        console.log(`Successfully generated content using ${modelName}`);
        break; // Success, exit loop
      } catch (err) {
        console.error(`Model ${modelName} failed:`, err.message);
        lastError = err;
      }
    }

    if (!resultText) {
      throw lastError || new Error("All available models failed.");
    }

    res.json({ success: true, result: resultText });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ success: false, error: "Failed to analyze image." });
  }
});

app.listen(port, () => {
  console.log(`CapMeSketch backend running on http://localhost:${port}`);
});

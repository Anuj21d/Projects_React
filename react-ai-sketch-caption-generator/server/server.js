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

    // Prepare the prompt for the AI
    const prompt = `
      You are an expert art critic and social media manager.
      Analyze this image and provide a response in the exact following format. DO NOT use markdown, bold text, or asterisks.
      
      Caption: [A short, engaging caption for this artwork, exactly 1 to 2 sentences maximum]
      Style: [Identify the art style, medium, and aesthetics in 2-4 words, e.g., Digital Watercolor, Whimsical]
      Hashtags: [#tag1 #tag2 #tag3]
    `;

    // Send to Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const response = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ]);

    const resultText = response.response.text();

    res.json({ success: true, result: resultText });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ success: false, error: "Failed to analyze image." });
  }
});

app.listen(port, () => {
  console.log(`CapMeSketch backend running on http://localhost:${port}`);
});

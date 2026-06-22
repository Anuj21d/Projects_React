# CapMeSketch React

React version of the AI Sketch Caption Generator.

## Run

To run this project, you need to start **both** the Frontend and the Backend servers.

### 1. Start the Backend (Kitchen)
Open a terminal, navigate to the `server` folder, and run:
```bash
cd server
npm install
npm start
```
*(Make sure you have added your `GEMINI_API_KEY` to the `server/.env` file!)*

### 2. Start the Frontend (Dining Room)
Open a **new, separate terminal**, ensure you are in the root `react-ai-sketch-caption-generator` folder, and run:
```bash
npm install
npm run dev
```

The app sends image analysis requests to `http://localhost:8787` (your running backend server).

## Context Storage

App state is managed in `src/context/AppContext.jsx`. It stores:

- active navigation item
- selected file and preview URL
- caption, mood, and hashtags
- drag, loading, and error states

Caption results are also persisted in `localStorage` under `capmesketch-state`.

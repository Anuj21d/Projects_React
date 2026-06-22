# Typing Speed Test

A sleek React typing challenge for measuring speed, accuracy, and consistency. Pick a difficulty, choose a mode, type the passage, and chase a better WPM score with every run.

## Why It Is Fun

- Live WPM, accuracy, and timer updates while you type
- Easy, Medium, and Hard passage difficulty
- Two practice styles: `Timed(60s)` and `Passage`
- Random passages so each round feels fresh
- Results screen with score feedback and personal-best tracking
- Responsive controls for desktop and mobile
- Dark, focused interface built for distraction-free practice

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Local Storage for best WPM

## Run Locally

```bash
cd Typing_Speed_Test
npm install
npm run dev
```

Then open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Project Structure

```text
Typing_Speed_Test/
  src/
    components/      # UI pieces for controls, typing area, and results
    context/         # Test state and settings state
    data/            # Typing passages grouped by difficulty
    pages/           # Home and result routes
    assets/          # Logos, icons, and decorative result art
```

## How The Test Works

The app compares each typed character with the active passage, counts correct and incorrect characters, then calculates:

- `WPM`: correct characters divided into five-character words over elapsed time
- `Accuracy`: percentage of typed characters that match the passage
- `Best WPM`: saved locally when a new high score is reached

## Future Ideas

- Add a leaderboard
- Add custom test durations
- Show mistake heatmaps
- Add keyboard sound themes
- Track progress across multiple sessions

Built for fast fingers, steady focus, and the oddly satisfying feeling of watching your WPM climb.

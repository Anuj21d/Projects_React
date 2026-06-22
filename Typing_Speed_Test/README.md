# Typing Speed Test

A sleek React typing challenge for measuring speed, accuracy, and consistency. Pick a difficulty, choose a mode, type the passage, and chase a better WPM score with every run.

## Highlights

- Live WPM, accuracy, and timer updates while you type
- Easy, Medium, and Hard passage difficulty
- Two practice styles: `Timed(60s)` and `Passage`
- Random passages for fresh rounds
- Results screen with personal-best feedback
- Responsive desktop and mobile controls
- Dark, focused UI powered by Tailwind CSS

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Local Storage

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Folder Guide

```text
src/
  components/      # Controls, typing test UI, and result UI
  context/         # Shared test and settings state
  data/            # Passage data by difficulty
  pages/           # Home and results screens
  assets/          # Logos, icons, and decorative artwork
```

## Score Logic

- `WPM`: calculated from correct characters, using five characters as one word
- `Accuracy`: correct typed characters divided by total typed characters
- `Best WPM`: stored in the browser with Local Storage

## Ideas To Add Next

- Custom test durations
- Session history
- Mistake review
- Shareable result cards
- More passage packs

Built for fast fingers, steady focus, and the satisfying little rush of beating your own score.

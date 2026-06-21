import data from "../../data/data.json";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SettingContext } from "../SettingContext/setting-context.js";
import { TestContext } from "./test-context.js";

export const TestProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentPassage, setCurrentPassage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { difficulty, mode } = useContext(SettingContext);

  let correctChars = 0;

  if (currentPassage) {
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentPassage.text[i]) {
        correctChars++;
      }
    }
  }

  const incorrectChars = typedText.length - correctChars;

  const generatePassage = useCallback((difficulty) => {
    const passages = data[difficulty];
    const randomIndex = Math.floor(Math.random() * passages.length);

    setCurrentPassage(passages[randomIndex]);
  }, []);

  const resetTest = () => {
    setIsStarted(false);
    setTypedText("");
    generatePassage(difficulty);
    setTimeLeft(60);
    setElapsedSeconds(0);
    setIsFinished(false);
  };

  useEffect(() => {
    if (!isStarted || isFinished) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (mode === "60s") {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            return 0;
          }

          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, mode]);

  const accuracy =
    typedText.length > 0
      ? ((correctChars / typedText.length) * 100).toFixed(0)
      : 0;

  const elapsedMinutes = elapsedSeconds / 60;
  const wpm =
    elapsedSeconds > 0 ? Math.floor(correctChars / 5 / elapsedMinutes) : 0;

  const bestWpm = Number(localStorage.getItem("bestWpm")) || 0;

  useEffect(() => {
    if (isFinished && wpm > bestWpm) {
      localStorage.setItem("bestWpm", wpm);
    }
  }, [bestWpm, isFinished, wpm]);

  return (
    <TestContext.Provider
      value={{
        isStarted,
        setIsStarted,
        typedText,
        setTypedText,
        data,
        resetTest,
        generatePassage,
        currentPassage,
        setCurrentPassage,
        inputRef,
        timeLeft,
        setTimeLeft,
        elapsedSeconds,
        isFinished,
        setIsFinished,
        correctChars,
        incorrectChars,
        accuracy,
        wpm,
        bestWpm,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

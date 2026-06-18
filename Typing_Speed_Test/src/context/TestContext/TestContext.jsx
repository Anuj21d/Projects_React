import data from "../../data/data.json";
import { createContext, useState } from "react";
import React, { useContext, useRef, useEffect } from "react";
import { SettingContext } from "../SettingContext/SettingContext.jsx";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentPassage, setCurrentPassage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
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

  console.log("Correct:", correctChars);
  console.log("Incorrect:", incorrectChars);

  const generatePassage = (difficulty) => {
    const passages = data[difficulty];
    const randomIndex = Math.floor(Math.random() * passages.length);

    setCurrentPassage(passages[randomIndex]);
  };

  const resetTest = () => {
    setIsStarted(false);
    setTypedText("");
    generatePassage(difficulty);
    setTimeLeft(60);
    setIsFinished(false);
  };

  useEffect(() => {
    if (mode !== "60s" || !isStarted) return;

    if (currentPassage && typedText.length >= currentPassage.text.length) {
      setIsFinished(true);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsFinished(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, mode, typedText, currentPassage]);

  useEffect(() => {
    if (mode !== "passage") return;
    if (currentPassage && typedText.length >= currentPassage.text.length) {
      setIsFinished(true);
    }
  }, [typedText, currentPassage, mode]);

  const accuracy =
    typedText.length > 0
      ? ((correctChars / typedText.length) * 100).toFixed(0)
      : 0;

  const wpm = Math.floor(correctChars / 5);

  const bestWpm = Number(localStorage.getItem("bestWpm")) || 0;

  useEffect(() => {
    if (isFinished && wpm > bestWpm) {
      localStorage.setItem("bestWpm", wpm);
    }
  }, [isFinished, wpm]);

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

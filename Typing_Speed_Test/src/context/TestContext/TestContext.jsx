import data from "../../data/data.json";
import { createContext, useState } from "react";
import React, { useContext, useRef } from "react";
import { SettingContext } from "../SettingContext/SettingContext.jsx";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentPassage, setCurrentPassage] = useState(null);

  const { difficulty } = useContext(SettingContext);

  const generatePassage = (difficulty) => {
    const passages = data[difficulty];
    const randomIndex = Math.floor(Math.random() * passages.length);

    setCurrentPassage(passages[randomIndex]);
  };

  const resetTest = () => {
    setIsStarted(false);
    setTypedText("");
    generatePassage(difficulty);
  };

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
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

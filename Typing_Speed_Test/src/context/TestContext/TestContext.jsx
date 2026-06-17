import data from "../../data/data.json";
import { createContext, useState } from "react";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [typedText, setTypedText] = useState("");

  const resetTest = () => {
    setIsStarted(false);
    setTypedText("");
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
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

// context/SettingsContext.jsx

import { createContext, useState } from "react";

export const SettingContext = createContext();

const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("timed");

  return (
    <SettingContext.Provider
      value={{
        difficulty,
        setDifficulty,
        mode,
        setMode,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
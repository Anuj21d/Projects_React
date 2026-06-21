import { useState } from "react";
import { SettingContext } from "./setting-context.js";

const SettingsProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("60s");

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

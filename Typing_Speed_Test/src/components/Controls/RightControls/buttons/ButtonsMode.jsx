import React, { useState } from "react";
import { useContext } from "react";
import { SettingContext } from "../../../../context/SettingContext/SettingContext";

const ButtonsMode = () => {
  const { mode, setMode } = useContext(SettingContext);

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setMode("timed")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          mode === "timed"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Timed(60s)
      </button>
      <button
        onClick={() => setMode("passage")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          mode === "passage"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Passage
      </button>
    </div>
  );
};

export default ButtonsMode;

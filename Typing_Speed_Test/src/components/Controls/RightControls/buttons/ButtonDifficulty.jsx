import React, { useState } from "react";
import { useContext } from "react";
import { SettingContext } from "../../../../context/SettingContext/SettingContext";

const ButtonDifficulty = () => {
  const { difficulty, setDifficulty } =
    useContext(SettingContext);


  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setDifficulty("easy")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          difficulty === "easy"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Easy
      </button>

      <button
        onClick={() => setDifficulty("medium")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          difficulty === "medium"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Medium
      </button>

      <button
        onClick={() => setDifficulty("hard")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          difficulty === "hard"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Hard
      </button>
    </div>
  );
};

export default ButtonDifficulty;

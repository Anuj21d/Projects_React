import React, { useState } from "react";

const ButtonDifficulty = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setSelectedDifficulty("easy")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          selectedDifficulty === "easy"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Easy
      </button>

      <button
        onClick={() => setSelectedDifficulty("medium")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          selectedDifficulty === "medium"
            ? "border-blue-400 text-blue-400"
            : "border-neutral-600 text-neutral-50"
        }`}
      >
        Medium
      </button>

      <button
        onClick={() => setSelectedDifficulty("hard")}
        className={`text-[16px] px-2 py-1 rounded-lg border-2 ${
          selectedDifficulty === "hard"
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
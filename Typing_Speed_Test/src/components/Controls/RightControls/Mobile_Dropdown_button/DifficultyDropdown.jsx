import React, { useContext } from "react";
import { SettingContext } from "../../../../context/SettingContext/SettingContext";

const DifficultyDropdown = () => {
  const { difficulty, setDifficulty } = useContext(SettingContext);
  return (
    <div>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="
        text-center
    px-5
    py-2
    bg-neutral-900
    text-white
    border
    border-neutral-700
    rounded-xl
    outline-none
    text-lg
    w-full
  "
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultyDropdown;

import React, { useContext } from "react";
import { SettingContext } from "../../../../context/SettingContext/SettingContext";

const ModeDropdown = () => {
  const { mode, setMode } = useContext(SettingContext);
  return (
    <div>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="
   text-center
    px-4
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
        <option value="60s">Timed (60s)</option>
        <option value="passage">Passage</option>
      </select>
    </div>
  );
};

export default ModeDropdown;

import React from "react";
import ButtonDIfficulty from "./buttons/ButtonDifficulty";
import ButtonsMode from "./buttons/ButtonsMode";
import DifficultyDropdown from "./Mobile_Dropdown_button/DifficultyDropdown";
import ModeDropdown from "./Mobile_Dropdown_button/ModeDropdown";

const RightControls = () => {
  return (
    <div className="flex justify-between items-center lg:gap-0 gap-20 text-neutral-400 text-xl font-medium px-2 ">
      <div className="hidden lg:flex items-center gap-2 pr-8">
        {" "}
        <h2>Difficulty:</h2>
        <ButtonDIfficulty />
      </div>

      <div className="hidden lg:flex items-center gap-2 pl-8 border-l-2 border-neutral-800">
        <h2>Mode:</h2>
        <ButtonsMode />
      </div>
      <div className="flex lg:hidden w-[100vw] justify-between px-5">
        <DifficultyDropdown />
        <ModeDropdown />
      </div>
    </div>
  );
};

export default RightControls;

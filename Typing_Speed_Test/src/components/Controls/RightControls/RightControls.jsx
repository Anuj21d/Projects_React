import React from "react";
import ButtonDIfficulty from "./buttons/ButtonDifficulty";
import ButtonsMode from "./buttons/ButtonsMode";

const RightControls = () => {
  return (
    <div className="flex items-center  text-neutral-400 text-xl font-medium px-2">
      <div className="flex items-center gap-2 border-r border-neutral-600 pr-5">
        <h2>Difficulty:</h2>
        <ButtonDIfficulty />
      </div>
      <div className="flex items-center gap-2 pl-5">
        <h2>Mode:</h2>
        <ButtonsMode />
      </div>
    </div>
  );
};

export default RightControls;

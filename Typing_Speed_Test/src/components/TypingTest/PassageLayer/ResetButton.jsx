import React from "react";
import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";
import restartIcon from "/src/assets/images/icon-restart.svg";

const ResetButton = () => {
  const { resetTest, isStarted } = useContext(TestContext);
  return (
    <div className="flex justify-center mt-4 p-10 border-t-2 border-neutral-800">
      {isStarted && (
        <button
          className="bg-neutral-800 text-xl rounded-xl text-neutral-50 px-4 py-3 active:scale-90 flex items-center gap-2 font-semibold"
          onClick={resetTest}
        >
          Restart Test 
          <img src={restartIcon} alt="restartIcon"/>
        </button>
      )}
    </div>
  );
};

export default ResetButton;

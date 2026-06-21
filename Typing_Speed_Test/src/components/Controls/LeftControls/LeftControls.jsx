import React, { useContext } from "react";
import { TestContext } from "../../../context/TestContext/TestContext";

const LeftControls = () => {
  const { timeLeft } = useContext(TestContext);
  return (
    <div className="flex justify-evenly gap-5 text-neutral-400 text-md lg:text-xl font-medium lg:px-2">
      <h2 className="lg:inline flex flex-col gap-2">
        WPM:{" "}
        <span className="text-neutral-50 text-2xl lg:text-xl font-bold">0</span>
      </h2>
      <h2 className="px-10 border-x-2 border-neutral-800 lg:inline flex flex-col gap-2">
        Accuracy:{" "}
        <span className="text-neutral-50 text-2xl lg:text-xl font-bold">
          100%
        </span>
      </h2>
      <h2 className="lg:inline flex flex-col gap-2">
        Time:{" "}
        <span className="text-neutral-50 text-2xl lg:text-xl font-bold">
          0:{timeLeft}
        </span>
      </h2>
    </div>
  );
};

export default LeftControls;

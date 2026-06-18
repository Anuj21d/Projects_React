import React from "react";
import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";

const Scores = () => {
  const { correctChars, incorrectChars , accuracy ,wpm } = useContext(TestContext);

  return (
    <div className="flex items-center justify-evenly gap-8">
      <button className="p-5 border-2 border-neutral-600 rounded-lg flex flex-col items-start text-2xl text-neutral-500 pr-20">
        WPM: <span className="text-neutral-50 font-bold">{wpm}</span>
      </button>
      <button className="p-5 border-2 border-neutral-600 rounded-lg flex flex-col items-start text-2xl text-neutral-500 pr-10">
        Accuracy: <span className="text-neutral-50 font-bold">{accuracy}%</span>
      </button>
      <button className="p-5 border-2 border-neutral-600 rounded-lg flex flex-col items-start text-2xl text-neutral-500 pr-8">
        characters:{" "}
        <span className=" font-bold">
          <span className="text-green-400">{correctChars}</span> /
          <span className="text-red-400">{incorrectChars}</span>
        </span>
      </button>
    </div>
  );
};

export default Scores;

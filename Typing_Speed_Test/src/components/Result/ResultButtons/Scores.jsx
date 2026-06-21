import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/test-context.js";

const Scores = () => {
  const { correctChars, incorrectChars , accuracy ,wpm } = useContext(TestContext);

  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:justify-evenly lg:gap-8 gap-5 w-full ">
      <button className="lg:p-5 p-4 border-2 border-neutral-600 rounded-lg flex flex-col items-start text-2xl text-neutral-500 pr-20">
        WPM: <span className="text-neutral-50 font-bold">{wpm}</span>
      </button>
      <button className="lg:p-5 p-4 border-2 border-neutral-600 rounded-lg flex flex-col items-start text-2xl text-neutral-500 pr-10">
        Accuracy: <span className="text-neutral-50 font-bold">{accuracy}%</span>
      </button>
      <button className="lg:p-5 p-4 border-2 border-neutral-600 rounded-lg flex flex-col items-start text-2xl text-neutral-500 pr-8">
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

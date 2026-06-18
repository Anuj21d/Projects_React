import React, { useContext } from "react";
import ResultImages from "../components/Result/ResultImages/ResultImageComplete";
import ResultText from "../components/Result/ResultText/ResultText";
import ResultButtons from "../components/Result/ResultButtons/ResultButtons";
import Star1 from "../assets/images/pattern-star-1.svg";
import Star2 from "../assets/images/pattern-star-2.svg";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";

const Result = () => {
  const { wpm, bestWpm } = useContext(TestContext);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <ResultImages />
      <ResultText />
      <ResultButtons />
      <div className="absolute top-[60%] right-[10%]">
        <img src={Star1} alt="Star1" />
      </div>
      <div className="absolute top-[30%] left-[15%]">
        <img src={Star2} alt="Star2" />
      </div>
      {wpm > bestWpm ? (
        <div className="absolute bottom-0">
          <img
            src="/src/assets/images/pattern-confetti.svg"
            alt="You beat it"
          />
        </div>
      ) : (
        ""
      )}
      {wpm > bestWpm ? (
        <div className="absolute top-[20%] right-[30%]">
          <img src="/src/assets/images/icon-new-pb.svg" alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;

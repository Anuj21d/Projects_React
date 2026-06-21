import { useContext } from "react";
import ResultImages from "../components/Result/ResultImages/ResultImageComplete";
import ResultText from "../components/Result/ResultText/ResultText";
import ResultButtons from "../components/Result/ResultButtons/ResultButtons";
import Star1 from "../assets/images/pattern-star-1.svg";
import Star2 from "../assets/images/pattern-star-2.svg";
import { TestContext } from "/src/context/TestContext/test-context.js";
import BeatImg from "/src/assets/images/pattern-confetti.svg";
import Cheer from "/src/assets/images/icon-new-pb.svg";

const Result = () => {
  const { wpm, bestWpm } = useContext(TestContext);
  return (
    <div className="flex w-full lg:pt-25 pt-10 flex-col">
      <ResultImages />
      <ResultText />
      <ResultButtons />
      <div className="absolute lg:top-[60%] lg:right-[10%] top-[70%] right-[5%] lg:scale-100 scale-70">
        <img src={Star1} alt="Star1" />
      </div>
      <div className="absolute lg:top-[30%] lg:left-[15%] top-[15%] left-[7%] lg:scale-100 scale-75">
        <img src={Star2} alt="Star2" />
      </div>
      {wpm > bestWpm ? (
        <div className="absolute bottom-0">
          <img src={BeatImg} alt="You beat it" />
        </div>
      ) : (
        ""
      )}
      {wpm > bestWpm ? (
        <div className="absolute lg:top-[20%] lg:right-[30%] top-[35%] right-[5%]">
          <img src={Cheer} alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;

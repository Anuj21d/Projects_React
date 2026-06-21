import { useContext } from "react";
import restartIcon from "/src/assets/images/icon-restart2.svg";
import Scores from "./Scores";
import { useNavigate } from "react-router-dom";
import { TestContext } from "/src/context/TestContext/test-context.js";

const ResultButtons = () => {
  const navigate = useNavigate();
  const { resetTest } = useContext(TestContext);
  return (
    <div className="flex flex-col lg:gap-15 justify-center items-center z-10 w-full">
      <div>
        <Scores />
      </div>
      <div className="m-8">
        <button
          className="flex items-center justify-center gap-4 text-xl px-5 py-4 bg-neutral-50 font-semibold rounded-xl active:scale-90"
          onClick={() => {
            resetTest();
            navigate("/");
          }}
        >
          Go Again <img src={restartIcon} alt="resatrtIcon" />
        </button>
      </div>
    </div>
  );
};

export default ResultButtons;

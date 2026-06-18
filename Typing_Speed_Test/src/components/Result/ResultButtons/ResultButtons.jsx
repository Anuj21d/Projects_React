import React, { useContext } from "react";
import restartIcon from "/src/assets/images/icon-restart2.svg";
import Scores from "./Scores";
import { useNavigate } from "react-router-dom";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";

const ResultButtons = () => {
  const navigate = useNavigate();
  const { resetTest } = useContext(TestContext);
  return (
    <div className="flex flex-col gap-15 justify-center items-center z-10">
      <div>
        <Scores />
      </div>
      <div>
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

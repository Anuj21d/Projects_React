import React from "react";
import Controls from "../components/Controls/Controls";
import TypingTest from "../components/TypingTest/TypingTest";
import ResetButton from "../components/TypingTest/PassageLayer/ResetButton";
import { TestContext } from "../context/TestContext/TestContext";

import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SettingContext } from "../context/SettingContext/SettingContext";

const Home = () => {
  const navigate = useNavigate();
  const { isFinished, timeLeft } = useContext(TestContext);
  const {mode } = useContext(SettingContext)

  useEffect(() => {
    if (isFinished) {
      navigate("/results");
    }
  }, [isFinished]);

  return (
    <div>
      <Controls />
      <TypingTest />
      <ResetButton />
      {mode === "60s" ? <span className="absolute top-[18%] right-[5%] p-5 bg-green-400 rounded-full font-bold text-neutral-50 text-shadow-xs text-shadow-black">{timeLeft}s</span> : ""}
    </div>
  );
};

export default Home;

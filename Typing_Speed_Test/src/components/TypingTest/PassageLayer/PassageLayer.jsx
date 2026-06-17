import React from "react";
import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";
import { SettingContext } from "/src/context/SettingContext/SettingContext.jsx";
import ResetButton from "./ResetButton";

const PassageLayer = () => {
  const { data } = useContext(TestContext);
  const { difficulty } = useContext(SettingContext);
  const { isStarted } = useContext(TestContext);
  let shuffled = [];
  let randomFive = [];

  const passage = data[difficulty];
  if (difficulty == "easy") {
    shuffled = [...passage].sort(() => Math.random() - 0.6);
    randomFive = shuffled.slice(0, 6);
  } else if (difficulty == "medium") {
    shuffled = [...passage].sort(() => Math.random() - 0.4);
    randomFive = shuffled.slice(0, 4);
  } else {
    shuffled = [...passage].sort(() => Math.random() - 0.3);
    randomFive = shuffled.slice(0, 3);
  }

  return (
    <div className={"p-8"}>
      <p
        className={`text-4xl leading-relaxed text-neutral-50 font-normal text-left ${isStarted ? "" : "blur-sm"}`}
      >
        {randomFive.map((passage) => {
          return passage.text;
        })}
      </p>
    </div>
  );
};

export default PassageLayer;
